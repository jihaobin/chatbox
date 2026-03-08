import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  decodeCursor,
  encodeCursor,
  type PaginatedResult,
} from '../common/utils/cursor-pagination';
import { PrismaService } from '../database/prisma.service';
import { OpenAIProvider } from '../provider/openai/openai.provider';
import {
  SUPPORTED_CHAT_MODELS,
  type SupportedChatModel,
} from '../provider/supported-models';
import type {
  GenerateRequest,
  Message as ProviderMessage,
} from '../provider/model-provider.interface';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  ListConversationsQueryDto,
  type ConversationSortBy,
} from './dto/list-conversations-query.dto';
import { ListMessagesQueryDto } from './dto/list-messages-query.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ChatEventsService } from './chat-events.service';

interface ConversationEntity {
  id: string;
  userId: string;
  title: string | null;
  titleSetByUser: boolean;
  aiSettings: unknown;
  createdAt: Date;
  updatedAt: Date;
}

interface MessageEntity {
  id: string;
  role: ProviderMessage['role'];
  contentText: string | null;
  createdAt: Date;
  aiGeneration?: {
    responseJson?: unknown;
  } | null;
}

export interface SendMessageResult {
  userMessage: MessageEntity;
  assistantMessage: MessageEntity;
}

export type ChatStreamEvent =
  | {
      type: 'message.created';
      data: { assistantMessageId: string; generationId: string };
    }
  | { type: 'message.delta'; data: { delta: string } }
  | { type: 'message.reasoning'; data: { delta: string } }
  | { type: 'message.completed'; data: { assistantMessage: MessageEntity } }
  | { type: 'error'; data: { error: string } };

@Injectable()
export class ChatService {
  private readonly titleModel: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly openAIProvider: OpenAIProvider,
    private readonly configService: ConfigService,
    private readonly chatEventsService: ChatEventsService,
  ) {
    this.titleModel =
      this.configService.get<string>('OPENAI_TITLE_MODEL')?.trim() ||
      'gpt-4o-mini';
  }

  async createConversation(
    userId: string,
    dto: CreateConversationDto,
  ): Promise<ConversationEntity> {
    await this.ensureUserExists(userId);
    const title = dto.title?.trim();
    const aiSettings = this.sanitizeAiSettings(dto.aiSettings);
    const created = await this.db.conversation.create({
      data: {
        userId,
        title: title && title.length > 0 ? title : null,
        titleSetByUser: Boolean(title),
        aiSettings,
      },
    });
    return created as ConversationEntity;
  }

  async listConversations(
    userId: string,
    params: ListConversationsQueryDto,
  ): Promise<PaginatedResult<ConversationEntity>> {
    const limit = this.parseLimit(params.limit, 20, 100);
    const sortBy = this.normalizeSortBy(params.sortBy);
    const where = this.buildConversationCursorWhere(
      userId,
      sortBy,
      params.cursor,
    );

    const records = (await this.db.conversation.findMany({
      where,
      orderBy: [{ [sortBy]: 'desc' }, { id: 'desc' }],
      take: limit + 1,
    })) as ConversationEntity[];

    const hasMore = records.length > limit;
    const items = hasMore ? records.slice(0, limit) : records;
    const last = items.at(-1);

    return {
      items,
      nextCursor:
        hasMore && last ? this.encodeConversationCursor(last, sortBy) : null,
    };
  }

  async getConversation(
    id: string,
    userId: string,
  ): Promise<ConversationEntity> {
    return this.ensureConversationOwnership(id, userId);
  }

  async updateConversation(
    id: string,
    userId: string,
    dto: UpdateConversationDto,
  ): Promise<ConversationEntity> {
    await this.ensureConversationOwnership(id, userId);

    await this.db.conversation.update({
      where: { id },
      data: {
        title: dto.title?.trim() ?? null,
        titleSetByUser: dto.title !== undefined,
      },
    });

    return this.getConversation(id, userId);
  }

  async deleteConversation(id: string, userId: string): Promise<void> {
    await this.ensureConversationOwnership(id, userId);
    await this.db.conversation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async sendMessage(
    conversationId: string,
    userId: string,
    dto: CreateMessageDto,
  ): Promise<SendMessageResult> {
    const conversation = await this.ensureConversationOwnership(
      conversationId,
      userId,
    );
    await this.assertClientMessageIdNotDuplicated(
      conversationId,
      dto.clientMessageId,
    );

    const context = await this.buildContext(conversationId);
    const request = this.buildProviderRequest(conversation, dto, context);
    const completion = await this.openAIProvider.generateResponse(request);

    const result = await this.db.$transaction(
      async (tx: Record<string, any>) => {
        const userMessage = (await tx.message.create({
          data: {
            conversationId,
            authorUserId: userId,
            role: 'user',
            contentText: dto.content.text,
            clientMessageId: dto.clientMessageId,
          },
        })) as MessageEntity;

        const assistantMessage = (await tx.message.create({
          data: {
            conversationId,
            role: 'assistant',
            contentText: completion.content,
          },
        })) as MessageEntity;

        await tx.aIGeneration.create({
          data: {
            conversationId,
            assistantMessageId: assistantMessage.id,
            status: 'succeeded',
            provider: 'openai',
            model: completion.model,
            providerResponseId: completion.id,
            inputTokens: completion.usage?.promptTokens,
            outputTokens: completion.usage?.completionTokens,
            totalTokens: completion.usage?.totalTokens,
            completedAt: new Date(),
          },
        });

        await tx.conversation.update({
          where: { id: conversationId },
          data: {
            messageCount: { increment: 2 },
            lastMessageAt: new Date(),
            lastMessageId: assistantMessage.id,
          },
        });

        return { userMessage, assistantMessage };
      },
    );

    this.scheduleConversationTitleGeneration(conversationId, dto.content.text);

    return result as SendMessageResult;
  }

  async *streamMessage(
    conversationId: string,
    userId: string,
    dto: CreateMessageDto,
  ): AsyncGenerator<ChatStreamEvent> {
    const conversation = await this.ensureConversationOwnership(
      conversationId,
      userId,
    );
    await this.assertClientMessageIdNotDuplicated(
      conversationId,
      dto.clientMessageId,
    );

    const context = await this.buildContext(conversationId);
    const request = this.buildProviderRequest(conversation, dto, context);

    const bootstrap = await this.db.$transaction(
      async (tx: Record<string, any>) => {
        await tx.message.create({
          data: {
            conversationId,
            authorUserId: userId,
            role: 'user',
            contentText: dto.content.text,
            clientMessageId: dto.clientMessageId,
          },
        });

        const assistantMessage = (await tx.message.create({
          data: {
            conversationId,
            role: 'assistant',
            contentText: '',
          },
        })) as MessageEntity;

        const generation = await tx.aIGeneration.create({
          data: {
            conversationId,
            assistantMessageId: assistantMessage.id,
            status: 'streaming',
            provider: 'openai',
            model: request.model ?? 'gpt-4o-mini',
          },
        });

        return { assistantMessage, generation: generation as { id: string } };
      },
    );

    yield {
      type: 'message.created',
      data: {
        assistantMessageId: bootstrap.assistantMessage.id,
        generationId: bootstrap.generation.id,
      },
    };

    let assembledText = '';
    let usage: {
      promptTokens?: number;
      completionTokens?: number;
      totalTokens?: number;
    } = {};
    let responseId: string | null = null;
    let reasoningText = '';

    try {
      const stream = this.openAIProvider.streamResponse(request);

      for await (const event of stream) {
        if (event.type === 'start') {
          responseId = event.id;
          continue;
        }

        if (event.type === 'chunk') {
          assembledText += event.delta;
          yield { type: 'message.delta', data: { delta: event.delta } };
          continue;
        }

        if (event.type === 'reasoning') {
          reasoningText += event.delta;
          yield { type: 'message.reasoning', data: { delta: event.delta } };
          continue;
        }

        if (event.type === 'end') {
          usage = event.usage ?? {};
          break;
        }

        if (event.type === 'error') {
          throw new Error(event.error);
        }
      }

      const assistantMessage = (await this.db.$transaction(
        async (tx: Record<string, any>) => {
          const updatedAssistantMessage = (await tx.message.update({
            where: { id: bootstrap.assistantMessage.id },
            data: { contentText: assembledText },
          })) as MessageEntity;

          await tx.aIGeneration.update({
            where: { id: bootstrap.generation.id },
            data: {
              status: 'succeeded',
              providerResponseId: responseId,
              inputTokens: usage.promptTokens,
              outputTokens: usage.completionTokens,
              totalTokens: usage.totalTokens,
              responseJson:
                reasoningText.trim().length > 0
                  ? {
                      reasoning: {
                        summary: this.toReasoningSummary(reasoningText),
                        steps: this.toReasoningSteps(reasoningText),
                        text: reasoningText,
                      },
                    }
                  : undefined,
              completedAt: new Date(),
            },
          });

          await tx.conversation.update({
            where: { id: conversationId },
            data: {
              messageCount: { increment: 2 },
              lastMessageAt: new Date(),
              lastMessageId: bootstrap.assistantMessage.id,
            },
          });

          const nextReasoningPayload =
            reasoningText.trim().length > 0
              ? {
                  reasoning: {
                    summary: this.toReasoningSummary(reasoningText),
                    steps: this.toReasoningSteps(reasoningText),
                    text: reasoningText,
                  },
                }
              : undefined;

          return {
            ...updatedAssistantMessage,
            aiGeneration: nextReasoningPayload
              ? { responseJson: nextReasoningPayload }
              : null,
          } as MessageEntity;
        },
      )) as MessageEntity;

      this.scheduleConversationTitleGeneration(
        conversationId,
        dto.content.text,
      );

      yield { type: 'message.completed', data: { assistantMessage } };
    } catch (error) {
      await this.db.aIGeneration.update({
        where: { id: bootstrap.generation.id },
        data: {
          status: 'failed',
          errorDetail:
            error instanceof Error ? error.message : 'Unknown stream error',
          completedAt: new Date(),
        },
      });

      yield {
        type: 'error',
        data: {
          error: error instanceof Error ? error.message : 'Streaming failed',
        },
      };
    }
  }

  async listMessages(
    conversationId: string,
    userId: string,
    params: ListMessagesQueryDto,
  ): Promise<PaginatedResult<MessageEntity>> {
    await this.ensureConversationOwnership(conversationId, userId);
    const limit = this.parseLimit(params.limit, 50, 200);
    const where = this.buildMessagesCursorWhere(conversationId, params.before);

    const records = (await this.db.message.findMany({
      where,
      include:
        this.parseBoolean(params.includeAiMeta, false) ||
        this.parseBoolean(params.include_ai_meta, false)
          ? { aiGeneration: true }
          : undefined,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
    })) as MessageEntity[];

    const hasMore = records.length > limit;
    const pageItemsDesc = hasMore ? records.slice(0, limit) : records;

    return {
      items: [...pageItemsDesc].reverse(),
      nextCursor:
        hasMore && pageItemsDesc.length > 0
          ? encodeCursor({
              id: pageItemsDesc[pageItemsDesc.length - 1].id,
              createdAt:
                pageItemsDesc[pageItemsDesc.length - 1].createdAt.toISOString(),
            })
          : null,
    };
  }

  async buildContext(conversationId: string): Promise<ProviderMessage[]> {
    const recentMessages = (await this.db.message.findMany({
      where: {
        conversationId,
        deletedAt: null,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: 20,
    })) as MessageEntity[];

    return [...recentMessages]
      .reverse()
      .map((message) => ({
        role: message.role,
        content: message.contentText ?? '',
      }))
      .filter((message) => message.content.length > 0);
  }

  private get db(): Record<string, any> {
    return this.prisma as unknown as Record<string, any>;
  }

  private async ensureConversationOwnership(
    conversationId: string,
    userId: string,
  ): Promise<ConversationEntity> {
    const conversation = (await this.db.conversation.findFirst({
      where: {
        id: conversationId,
        userId,
        deletedAt: null,
      },
    })) as ConversationEntity | null;

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  private async ensureUserExists(userId: string): Promise<void> {
    await this.db.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        kind: 'anonymous',
      },
    });
  }

  private async assertClientMessageIdNotDuplicated(
    conversationId: string,
    clientMessageId?: string,
  ): Promise<void> {
    if (!clientMessageId) {
      return;
    }

    const duplicated = await this.db.message.findFirst({
      where: {
        conversationId,
        clientMessageId,
        deletedAt: null,
      },
    });

    if (duplicated) {
      throw new BadRequestException(
        'Duplicate clientMessageId for this conversation',
      );
    }
  }

  private buildProviderRequest(
    conversation: ConversationEntity,
    dto: CreateMessageDto,
    context: ProviderMessage[],
  ): GenerateRequest {
    const settings = {
      ...(this.asRecord(conversation.aiSettings) ?? {}),
      ...(dto.aiOverrides ?? {}),
    };
    const model = this.resolveChatModel(settings.model);

    return {
      model,
      temperature: settings.temperature,
      maxTokens: settings.maxOutputTokens,
      systemPrompt: settings.systemPrompt as string | undefined,
      messages: [...context, { role: 'user', content: dto.content.text }],
      stream: dto.response?.stream,
    };
  }

  private buildConversationCursorWhere(
    userId: string,
    sortBy: ConversationSortBy,
    cursor?: string,
  ): Record<string, unknown> {
    const where: Record<string, unknown> = {
      userId,
      deletedAt: null,
    };

    if (!cursor) {
      return where;
    }

    const decoded = decodeCursor(cursor);
    const cursorDate =
      sortBy === 'createdAt' ? decoded.createdAt : decoded.updatedAt;
    if (!cursorDate) {
      throw new BadRequestException(
        'Cursor does not match selected sort field',
      );
    }

    where.OR = [
      { [sortBy]: { lt: new Date(cursorDate) } },
      { [sortBy]: new Date(cursorDate), id: { lt: decoded.id } },
    ];
    return where;
  }

  private buildMessagesCursorWhere(
    conversationId: string,
    before?: string,
  ): Record<string, unknown> {
    const where: Record<string, unknown> = {
      conversationId,
      deletedAt: null,
    };

    if (!before) {
      return where;
    }

    const decoded = decodeCursor(before);
    if (!decoded.createdAt) {
      throw new BadRequestException('Invalid before cursor for messages');
    }

    where.OR = [
      { createdAt: { lt: new Date(decoded.createdAt) } },
      { createdAt: new Date(decoded.createdAt), id: { lt: decoded.id } },
    ];

    return where;
  }

  private encodeConversationCursor(
    conversation: ConversationEntity,
    sortBy: ConversationSortBy,
  ): string {
    return encodeCursor({
      id: conversation.id,
      createdAt:
        sortBy === 'createdAt'
          ? conversation.createdAt.toISOString()
          : undefined,
      updatedAt:
        sortBy === 'updatedAt'
          ? conversation.updatedAt.toISOString()
          : undefined,
    });
  }

  private normalizeSortBy(sortBy?: ConversationSortBy): ConversationSortBy {
    return sortBy === 'createdAt' ? 'createdAt' : 'updatedAt';
  }

  private parseLimit(
    value: number | string | undefined,
    fallback: number,
    max: number,
  ): number {
    if (value === undefined || Number.isNaN(Number(value))) {
      return fallback;
    }

    return Math.min(max, Math.max(1, Number(value)));
  }

  private parseBoolean(
    value: boolean | string | undefined,
    fallback: boolean,
  ): boolean {
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
        return true;
      }

      if (value.toLowerCase() === 'false') {
        return false;
      }
    }

    return fallback;
  }

  private asRecord(value: unknown): Record<string, unknown> | null {
    if (value && typeof value === 'object') {
      return value as Record<string, unknown>;
    }
    return null;
  }

  private resolveChatModel(value: unknown): SupportedChatModel {
    if (typeof value !== 'string' || value.trim().length === 0) {
      return SUPPORTED_CHAT_MODELS[0];
    }

    const model = value.trim();
    if ((SUPPORTED_CHAT_MODELS as readonly string[]).includes(model)) {
      return model as SupportedChatModel;
    }

    throw new BadRequestException(
      `Unsupported model: ${model}. Supported models: ${SUPPORTED_CHAT_MODELS.join(', ')}`,
    );
  }

  private sanitizeAiSettings(
    settings?: CreateConversationDto['aiSettings'],
  ): Record<string, unknown> {
    const record = this.asRecord(settings);
    if (!record) {
      return {};
    }

    const nextSettings: Record<string, unknown> = { ...record };
    if ('model' in nextSettings) {
      nextSettings.model = this.resolveChatModel(nextSettings.model);
    }

    return nextSettings;
  }

  private scheduleConversationTitleGeneration(
    conversationId: string,
    userText: string,
  ): void {
    setTimeout(() => {
      void this.runConversationTitleGeneration(conversationId, userText).catch(
        () => undefined,
      );
    }, 0);
  }

  private async runConversationTitleGeneration(
    conversationId: string,
    userText: string,
  ): Promise<void> {
    const title = await this.generateConversationTitle(userText);
    if (!title) {
      return;
    }

    const updateResult = await this.db.conversation.updateMany({
      where: {
        id: conversationId,
        title: null,
        titleSetByUser: false,
      },
      data: {
        title,
      },
    });

    if (updateResult?.count > 0) {
      this.chatEventsService.emit({
        type: 'conversation.title.updated',
        data: {
          conversationId,
          title,
        },
      });
    }
  }

  private async generateConversationTitle(
    text: string,
  ): Promise<string | null> {
    const normalizedInput = text.trim();
    if (!normalizedInput) {
      return null;
    }

    try {
      const completion = await this.openAIProvider.generateResponse({
        model: this.titleModel,
        temperature: 0.1,
        maxTokens: 20,
        systemPrompt:
          '你是对话标题生成器。目标是提炼用户真正意图，不要复述原句。输出要求：1) 只输出标题纯文本；2) 中文优先，6-14个汉字；3) 不要标点结尾，不要引号，不要解释；4) 风格参考常见Chat应用，如“测试推理功能”“短视频脚本创作”“近视与护眼关系”；5) 过长时优先保留任务核心词。',
        messages: [
          {
            role: 'user',
            content: `用户消息：${normalizedInput}\n请输出一个符合要求的标题。`,
          },
        ],
      });

      const normalizedTitle = this.normalizeGeneratedTitle(completion.content);

      if (!normalizedTitle) {
        return this.fallbackTitleFromText(normalizedInput);
      }

      return normalizedTitle;
    } catch {
      return this.fallbackTitleFromText(normalizedInput);
    }
  }

  private fallbackTitleFromText(text: string): string {
    const normalized = text.replace(/\s+/g, ' ').trim();
    const lowered = normalized.toLowerCase();

    const mapped = [
      {
        tests: ['报错', '错误', '异常', 'error', 'bug', 'debug'],
        title: '问题排查与修复',
      },
      { tests: ['推理', '思考', 'reasoning'], title: '测试推理功能' },
      { tests: ['视频', '脚本', '短视频'], title: '短视频脚本创作' },
      { tests: ['翻译', 'translate'], title: '文本翻译优化' },
      { tests: ['图片', '海报', '图像'], title: '图片生成与优化' },
      { tests: ['总结', '归纳', '概括'], title: '内容总结提炼' },
      { tests: ['方案', '设计', '架构'], title: '方案设计评估' },
    ].find((rule) =>
      rule.tests.some((item) => lowered.includes(item.toLowerCase())),
    );

    if (mapped) {
      return mapped.title;
    }

    return this.normalizeGeneratedTitle(normalized) ?? '对话任务讨论';
  }

  private normalizeGeneratedTitle(raw: string): string | null {
    const cleaned = raw
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^['"“”‘’]+|['"“”‘’]+$/g, '')
      .replace(/[。！？.!?；;，,：:\-—_]+$/g, '')
      .trim();

    const blacklistFragments = [
      '请帮我',
      '帮我',
      '我想',
      '我需要',
      '请问',
      '能不能',
      '可以帮我',
      '一下',
      '这个问题',
      '这个需求',
      '关于',
      '标题',
      '对话',
      '聊天',
    ];

    const cleanedWithoutBlacklistedPhrases = blacklistFragments
      .reduce((title, fragment) => title.replaceAll(fragment, ''), cleaned)
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanedWithoutBlacklistedPhrases) {
      return null;
    }

    const chineseCharCount = (
      cleanedWithoutBlacklistedPhrases.match(/[\u4e00-\u9fff]/g) ?? []
    ).length;
    if (chineseCharCount > 0) {
      return cleanedWithoutBlacklistedPhrases.slice(0, 14);
    }

    return cleanedWithoutBlacklistedPhrases
      .split(' ')
      .slice(0, 7)
      .join(' ')
      .slice(0, 36);
  }

  private toReasoningSteps(reasoningText: string): string[] {
    const normalized = reasoningText
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();
    if (!normalized) {
      return [];
    }

    return normalized
      .split(/(?<=[。！？.!?])\s+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .slice(0, 8);
  }

  private toReasoningSummary(reasoningText: string): string {
    const summary = reasoningText.replace(/\s+/g, ' ').trim();
    if (summary.length <= 120) {
      return summary;
    }

    return `${summary.slice(0, 117)}...`;
  }
}
