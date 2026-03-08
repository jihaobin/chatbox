import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getRequestId } from '../utils/generate-request-id';
import { sanitizeForLogging } from '../utils/sanitizer';
import { getOpenAIErrorTemplate } from './openai-error.map';
import { ProblemDetail } from './problem-detail.types';

@Catch()
export class ProblemDetailFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemDetailFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId = getRequestId(request.headers);
    const problemDetail = this.buildProblemDetail(
      exception,
      request,
      requestId,
    );

    this.logError(exception, request, requestId);

    response.status(problemDetail.status).json(problemDetail);
  }

  private buildProblemDetail(
    exception: unknown,
    request: Request,
    requestId: string,
  ): ProblemDetail {
    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, request, requestId);
    }

    if (this.isOpenAIError(exception)) {
      return this.handleOpenAIError(exception, request, requestId);
    }

    return this.handleUnknownError(exception, request, requestId);
  }

  private handleHttpException(
    exception: HttpException,
    request: Request,
    requestId: string,
  ): ProblemDetail {
    const status = exception.getStatus();
    const response = exception.getResponse();

    const title = this.getHttpStatusTitle(status);
    const detail = this.extractDetailFromResponse(response);

    return {
      type: `/problems/${this.getProblemType(status)}`,
      title,
      status,
      detail,
      instance: request.path,
      requestId,
      code: this.getErrorCode(status),
    };
  }

  private handleOpenAIError(
    exception: any,
    request: Request,
    requestId: string,
  ): ProblemDetail {
    const errorCode = exception.code || exception.error?.code || 'server_error';
    const template = getOpenAIErrorTemplate(errorCode);

    return {
      ...template,
      instance: request.path,
      requestId,
      detail: exception.message || template.detail,
    };
  }

  private handleUnknownError(
    exception: unknown,
    request: Request,
    requestId: string,
  ): ProblemDetail {
    return {
      type: '/problems/internal-server-error',
      title: '服务器内部错误',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      detail: '服务器发生未知错误，请稍后再试',
      instance: request.path,
      requestId,
      code: 'INTERNAL_SERVER_ERROR',
    };
  }

  private logError(
    exception: unknown,
    request: Request,
    requestId: string,
  ): void {
    const sanitizedException = sanitizeForLogging(exception);
    const sanitizedRequest = {
      method: request.method,
      path: request.path,
      query: sanitizeForLogging(request.query),
      body: sanitizeForLogging(request.body),
    };

    this.logger.error(
      `Request ID: ${requestId} | ${request.method} ${request.path}`,
      JSON.stringify({
        exception: sanitizedException,
        request: sanitizedRequest,
      }),
    );
  }

  private extractDetailFromResponse(response: string | object): string {
    if (typeof response === 'string') {
      return response;
    }

    if (typeof response === 'object' && response !== null) {
      const responseObj = response as Record<string, unknown>;
      if (typeof responseObj.message === 'string') {
        return responseObj.message;
      }
      if (Array.isArray(responseObj.message)) {
        return responseObj.message.join(', ');
      }
    }

    return '';
  }

  private getHttpStatusTitle(status: number): string {
    const titles: Record<number, string> = {
      400: '请求参数错误',
      401: '未授权',
      403: '禁止访问',
      404: '资源不存在',
      422: '无法处理的实体',
      429: '请求过于频繁',
      500: '服务器内部错误',
      503: '服务暂时不可用',
    };

    return titles[status] || '请求失败';
  }

  private getProblemType(status: number): string {
    const types: Record<number, string> = {
      400: 'bad-request',
      401: 'unauthorized',
      403: 'forbidden',
      404: 'not-found',
      422: 'unprocessable-entity',
      429: 'rate-limited',
      500: 'internal-server-error',
      503: 'service-unavailable',
    };

    return types[status] || 'error';
  }

  private getErrorCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'RATE_LIMITED',
      500: 'INTERNAL_SERVER_ERROR',
      503: 'SERVICE_UNAVAILABLE',
    };

    return codes[status] || 'ERROR';
  }
  private isOpenAIError(exception: unknown): boolean {
    if (!exception || typeof exception !== 'object') {
      return false;
    }

    const error = exception as Record<string, unknown>;
    return (
      error.constructor?.name === 'OpenAIError' ||
      error.constructor?.name === 'APIError' ||
      typeof error.code === 'string' ||
      typeof (error.error as Record<string, unknown>)?.code === 'string'
    );
  }
}
