import {
  Injectable,
  LoggerService as NestLoggerService,
  Scope,
} from '@nestjs/common';
import pino from 'pino';

interface ChatRequestData {
  requestId: string;
  userId?: string;
  conversationId?: string;
  model: string;
  inputTokens: number;
  latencyMs: number;
}

@Injectable({ scope: Scope.TRANSIENT })
export class PinoLoggerService implements NestLoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const logLevel = process.env.LOG_LEVEL || 'info';

    this.logger = pino({
      level: logLevel,
      transport: isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    });
  }

  log(message: any, context?: string) {
    this.logger.info({ context }, message);
  }

  error(message: any, trace?: string, context?: string) {
    if (message instanceof Error) {
      this.logger.error(
        {
          context,
          trace: trace ?? message.stack,
          err: {
            name: message.name,
            message: message.message,
            stack: message.stack,
          },
        },
        message.message,
      );
      return;
    }

    this.logger.error({ context, trace, err: message }, message);
  }

  warn(message: any, context?: string) {
    this.logger.warn({ context }, message);
  }

  debug(message: any, context?: string) {
    this.logger.debug({ context }, message);
  }

  verbose(message: any, context?: string) {
    this.logger.trace({ context }, message);
  }

  logChatRequest(data: ChatRequestData) {
    this.logger.info(
      {
        type: 'chat_request',
        requestId: data.requestId,
        userId: data.userId,
        conversationId: data.conversationId,
        model: data.model,
        inputTokens: data.inputTokens,
        latencyMs: data.latencyMs,
      },
      'AI chat request processed',
    );
  }
}
