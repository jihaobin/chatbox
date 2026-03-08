import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, headers } = request;
    const userAgent = headers['user-agent'] || 'unknown';

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const durationMs = Date.now() - startTime;
          const statusCode = response.statusCode;

          this.logger.log(
            {
              method,
              path: url,
              statusCode,
              durationMs,
              userAgent,
            },
            `${method} ${url} ${statusCode}`,
          );
        },
        error: (error) => {
          const durationMs = Date.now() - startTime;
          const statusCode = error.status || 500;

          this.logger.error(
            {
              method,
              path: url,
              statusCode,
              durationMs,
              userAgent,
              error: error.message,
            },
            `${method} ${url} ${statusCode}`,
          );
        },
      }),
    );
  }
}
