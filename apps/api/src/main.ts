import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ProblemDetailFilter } from './common/filters/problem-detail.filter';
import { PinoLoggerService } from './common/logger/pino-logger.service';
import { RequestLogInterceptor } from './common/interceptors/request-log.interceptor';

function parseCorsOrigins(value?: string): string[] {
  return (value ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new PinoLoggerService(),
  });
  const configService = app.get(ConfigService);
  const corsOrigins = parseCorsOrigins(
    configService.get<string>('app.corsOrigin'),
  );

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useGlobalFilters(new ProblemDetailFilter());
  app.useGlobalInterceptors(new RequestLogInterceptor());
  await app.listen(configService.get<number>('app.port') ?? 3001);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
