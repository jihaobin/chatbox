import { Module } from '@nestjs/common';
import { ProblemDetailFilter } from './filters/problem-detail.filter';
import { LoggerModule } from './logger/logger.module';
import { RequestLogInterceptor } from './interceptors/request-log.interceptor';

@Module({
  imports: [LoggerModule],
  providers: [ProblemDetailFilter, RequestLogInterceptor],
  exports: [ProblemDetailFilter, LoggerModule, RequestLogInterceptor],
})
export class CommonModule {}
