import {
  Body,
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ChatEventsService } from './chat-events.service';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ListConversationsQueryDto } from './dto/list-conversations-query.dto';
import { ListMessagesQueryDto } from './dto/list-messages-query.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

const MVP_USER_ID = '00000000-0000-4000-8000-000000000001';

@Controller('v1')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatEventsService: ChatEventsService,
  ) {}

  @Post('conversations')
  async createConversation(
    @Body() dto: CreateConversationDto,
  ): Promise<unknown> {
    const conversation = await this.chatService.createConversation(
      MVP_USER_ID,
      dto,
    );
    return { data: conversation };
  }

  @Get('conversations')
  async listConversations(
    @Query() query: ListConversationsQueryDto,
  ): Promise<unknown> {
    const result = await this.chatService.listConversations(MVP_USER_ID, query);
    return {
      data: result.items,
      meta: {
        page: {
          limit: query.limit,
          nextCursor: result.nextCursor,
        },
      },
    };
  }

  @Get('conversations/:id')
  async getConversation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<unknown> {
    const conversation = await this.chatService.getConversation(
      id,
      MVP_USER_ID,
    );
    return { data: conversation };
  }

  @Patch('conversations/:id')
  async updateConversation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateConversationDto,
  ): Promise<unknown> {
    const conversation = await this.chatService.updateConversation(
      id,
      MVP_USER_ID,
      dto,
    );
    return { data: conversation };
  }

  @Delete('conversations/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteConversation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.chatService.deleteConversation(id, MVP_USER_ID);
  }

  @Post('conversations/:id/messages')
  async sendMessage(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: CreateMessageDto,
    @Query('stream') stream?: string,
    @Req() req?: Request,
    @Res() res?: Response,
  ): Promise<unknown> {
    const shouldStreamFromQuery = (stream ?? '').toLowerCase() === 'true';
    const shouldStreamFromBody = dto.response?.stream === true;
    const acceptsEventStream =
      req?.headers.accept?.toLowerCase().includes('text/event-stream') ?? false;
    const shouldStream =
      shouldStreamFromQuery || shouldStreamFromBody || acceptsEventStream;

    if (!shouldStream || !res) {
      const messageResult = await this.chatService.sendMessage(
        id,
        MVP_USER_ID,
        dto,
      );
      return { data: messageResult };
    }

    const formatErrorForSse = (error: unknown): string => {
      if (error instanceof BadRequestException) {
        const response = error.getResponse();
        if (typeof response === 'string') {
          return response;
        }

        if (response && typeof response === 'object' && 'message' in response) {
          const message = (response as { message?: unknown }).message;
          if (typeof message === 'string') {
            return message;
          }

          if (Array.isArray(message) && typeof message[0] === 'string') {
            return message[0];
          }
        }
      }

      if (error instanceof Error) {
        return error.message;
      }

      return 'Streaming failed';
    };

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const onClose = (): void => {
      res.end();
    };

    req?.on('close', onClose);

    try {
      for await (const event of this.chatService.streamMessage(
        id,
        MVP_USER_ID,
        dto,
      )) {
        res.write(`event: ${event.type}\n`);
        res.write(`data: ${JSON.stringify(event.data)}\n\n`);
      }
    } catch (error) {
      if (!res.writableEnded) {
        res.write('event: error\n');
        res.write(
          `data: ${JSON.stringify({ detail: formatErrorForSse(error) })}\n\n`,
        );
      }
    } finally {
      req?.off('close', onClose);
      if (!res.writableEnded) {
        res.end();
      }
    }

    return undefined;
  }

  @Get('conversations/:id/messages')
  async listMessages(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query() query: ListMessagesQueryDto,
  ): Promise<unknown> {
    const result = await this.chatService.listMessages(id, MVP_USER_ID, query);
    return {
      data: result.items,
      meta: {
        page: {
          limit: query.limit,
          nextCursor: result.nextCursor,
        },
      },
    };
  }

  @Get('conversations/:id/events')
  async streamConversationEvents(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    await this.chatService.getConversation(id, MVP_USER_ID);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const unsubscribe = this.chatEventsService.subscribe(id, (event) => {
      if (res.writableEnded) {
        return;
      }

      res.write(`event: ${event.type}\n`);
      res.write(`data: ${JSON.stringify(event.data)}\n\n`);
    });

    const heartbeat = setInterval(() => {
      if (!res.writableEnded) {
        res.write(': heartbeat\n\n');
      }
    }, 15000);

    const onClose = (): void => {
      unsubscribe();
      clearInterval(heartbeat);
      if (!res.writableEnded) {
        res.end();
      }
    };

    req.on('close', onClose);
  }
}
