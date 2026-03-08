import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import type {
  GenerateRequest,
  GenerateResponse,
  Message,
  ModelProvider,
  StreamEvent,
} from '../model-provider.interface';
import { SUPPORTED_CHAT_MODELS } from '../supported-models';
import type {
  OpenAIChatCompletion,
  OpenAIChatCompletionCreateParamsNonStreaming,
  OpenAIChatCompletionCreateParamsStreaming,
  OpenAIMessageParam,
} from './openai.types';

@Injectable()
export class OpenAIProvider implements ModelProvider {
  private readonly defaultModel: string;
  private readonly reasoningEffort: 'none' | 'low' | 'medium' | 'high';
  private readonly client: OpenAI;
  private readonly baseURL?: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY')?.trim();
    if (!apiKey) {
      throw new InternalServerErrorException(
        'OPENAI_API_KEY is not configured',
      );
    }

    this.defaultModel =
      this.configService.get<string>('OPENAI_MODEL')?.trim() ??
      SUPPORTED_CHAT_MODELS[0];
    this.reasoningEffort = this.resolveReasoningEffort(
      this.configService.get<string>('OPENAI_REASONING_EFFORT')?.trim(),
    );

    const baseURL = this.configService.get<string>('OPENAI_BASE_URL')?.trim();
    this.baseURL = baseURL;

    this.client = new OpenAI({
      apiKey,
      ...(baseURL ? { baseURL } : {}),
      timeout: 45000,
      maxRetries: 3,
    });
  }

  async generateResponse(request: GenerateRequest): Promise<GenerateResponse> {
    try {
      const model = this.resolveModel(request);
      const completion = await this.withConnectionRetry(() =>
        this.client.chat.completions.create(
          this.buildChatCompletionParamsNonStreaming(request, model),
        ),
      );

      return this.toGenerateResponse(completion);
    } catch (error) {
      throw this.toProviderError(error);
    }
  }

  async *streamResponse(
    request: GenerateRequest,
  ): AsyncGenerator<StreamEvent, void, void> {
    let started = false;
    const model = this.resolveModel(request);

    try {
      const stream = await this.withConnectionRetry(() =>
        this.client.chat.completions.create(
          this.buildChatCompletionParamsStreaming(request, model),
        ),
      );

      for await (const chunk of stream) {
        if (!started) {
          started = true;
          yield {
            type: 'start',
            id: chunk.id,
            model: chunk.model,
          };
        }

        const delta = chunk.choices[0]?.delta?.content ?? '';
        if (delta) {
          yield {
            type: 'chunk',
            delta,
          };
        }

        const reasoningDelta = this.extractReasoningDelta(chunk);
        if (reasoningDelta) {
          yield {
            type: 'reasoning',
            delta: reasoningDelta,
          };
        }

        const finishReason = chunk.choices[0]?.finish_reason;
        if (finishReason) {
          yield {
            type: 'end',
            finishReason,
            usage: {
              promptTokens: chunk.usage?.prompt_tokens,
              completionTokens: chunk.usage?.completion_tokens,
              totalTokens: chunk.usage?.total_tokens,
            },
          };
        }
      }

      if (!started) {
        yield {
          type: 'error',
          error: 'OpenAI returned an empty stream.',
        };
      }
    } catch (error) {
      if (this.isConnectionError(error) && !started) {
        try {
          const completion = await this.withConnectionRetry(
            () =>
              this.client.chat.completions.create(
                this.buildChatCompletionParamsNonStreaming(request, model),
              ),
            2,
          );
          const response = this.toGenerateResponse(completion);

          yield {
            type: 'start',
            id: response.id,
            model: response.model,
          };

          if (response.content) {
            yield {
              type: 'chunk',
              delta: response.content,
            };
          }

          yield {
            type: 'end',
            finishReason: response.finishReason,
            usage: {
              promptTokens: response.usage?.promptTokens,
              completionTokens: response.usage?.completionTokens,
              totalTokens: response.usage?.totalTokens,
            },
          };
          return;
        } catch (fallbackError) {
          const providerError = this.toProviderError(fallbackError);
          yield {
            type: 'error',
            error: providerError.message,
          };
          return;
        }
      }

      const providerError = this.toProviderError(error);
      yield {
        type: 'error',
        error: providerError.message,
      };
    }
  }

  async countTokens(messages: Message[], _model?: string): Promise<number> {
    return messages
      .map((message) => message.content.trim())
      .filter((content) => content.length > 0)
      .reduce((count, content) => count + content.split(/\s+/).length, 0);
  }

  private resolveModel(request: GenerateRequest): string {
    return request.model?.trim() || this.defaultModel;
  }

  private resolveReasoningEffort(
    value: string | undefined,
  ): 'none' | 'low' | 'medium' | 'high' {
    if (
      value === 'none' ||
      value === 'low' ||
      value === 'medium' ||
      value === 'high'
    ) {
      return value;
    }

    return 'medium';
  }

  private buildChatCompletionParamsNonStreaming(
    request: GenerateRequest,
    model: string,
  ): OpenAIChatCompletionCreateParamsNonStreaming {
    const baseParams = {
      model,
      messages: this.toOpenAIMessages(request),
      temperature: request.temperature,
      max_tokens: request.maxTokens,
      stream: false as const,
    };

    const shouldAttachReasoningEffort = model.startsWith('gpt-5');
    if (!shouldAttachReasoningEffort) {
      return baseParams;
    }

    return {
      ...baseParams,
      reasoning_effort: this.reasoningEffort,
    } as OpenAIChatCompletionCreateParamsNonStreaming;
  }

  private buildChatCompletionParamsStreaming(
    request: GenerateRequest,
    model: string,
  ): OpenAIChatCompletionCreateParamsStreaming {
    const baseParams = {
      model,
      messages: this.toOpenAIMessages(request),
      temperature: request.temperature,
      max_tokens: request.maxTokens,
      stream: true as const,
    };

    const shouldAttachReasoningEffort = model.startsWith('gpt-5');
    if (!shouldAttachReasoningEffort) {
      return baseParams;
    }

    return {
      ...baseParams,
      reasoning_effort: this.reasoningEffort,
    } as OpenAIChatCompletionCreateParamsStreaming;
  }

  private toOpenAIMessages(request: GenerateRequest): OpenAIMessageParam[] {
    const messages: OpenAIMessageParam[] = [];

    if (request.systemPrompt?.trim()) {
      messages.push({ role: 'system', content: request.systemPrompt.trim() });
    }

    messages.push(
      ...request.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    );

    return messages;
  }

  private toGenerateResponse(
    completion: OpenAIChatCompletion,
  ): GenerateResponse {
    const choice = completion.choices[0];

    return {
      id: completion.id,
      model: completion.model,
      content: choice?.message?.content ?? '',
      finishReason: choice?.finish_reason,
      usage: {
        promptTokens: completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
        totalTokens: completion.usage?.total_tokens,
      },
    };
  }

  private toProviderError(error: unknown): InternalServerErrorException {
    if (error instanceof OpenAI.APIConnectionError) {
      return new InternalServerErrorException(
        `OpenAI connection failed (${this.baseURL ?? 'default endpoint'}): ${error.message}`,
      );
    }

    if (error instanceof OpenAI.APIError) {
      return new InternalServerErrorException(
        `OpenAI request failed (${error.status ?? 'unknown'}): ${error.message}`,
      );
    }

    if (error instanceof Error) {
      return new InternalServerErrorException(error.message);
    }

    return new InternalServerErrorException('Unknown OpenAI provider error');
  }

  private extractReasoningDelta(
    chunk: OpenAI.Chat.Completions.ChatCompletionChunk,
  ): string {
    const choice = chunk.choices[0] as unknown as {
      delta?: {
        reasoning_content?: unknown;
        reasoning?: unknown;
      };
    };

    const reasoningContent = choice?.delta?.reasoning_content;
    if (typeof reasoningContent === 'string' && reasoningContent.length > 0) {
      return reasoningContent;
    }

    const reasoning = choice?.delta?.reasoning;
    if (typeof reasoning === 'string' && reasoning.length > 0) {
      return reasoning;
    }

    if (Array.isArray(reasoning)) {
      return reasoning
        .map((entry) => {
          if (typeof entry === 'string') {
            return entry;
          }

          if (entry && typeof entry === 'object' && 'text' in entry) {
            const text = (entry as { text?: unknown }).text;
            return typeof text === 'string' ? text : '';
          }

          return '';
        })
        .join('')
        .trim();
    }

    return '';
  }

  private isConnectionError(error: unknown): boolean {
    if (error instanceof OpenAI.APIConnectionError) {
      return true;
    }

    if (!(error instanceof Error)) {
      return false;
    }

    return error.message.toLowerCase().includes('connection error');
  }

  private async withConnectionRetry<T>(
    operation: () => Promise<T>,
    attempts = 3,
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        if (!this.isConnectionError(error) || attempt >= attempts) {
          throw error;
        }

        await this.sleep(attempt * 250);
      }
    }

    throw lastError;
  }

  private async sleep(delayMs: number): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, delayMs);
    });
  }
}
