import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        OPENAI_API_KEY: Joi.string().default(
          'sk-L72C4WgJg8D64WVVJxU2JIMhlADOupz0',
        ),
        OPENAI_MODEL: Joi.string().default('gpt-5.4'),
        OPENAI_TITLE_MODEL: Joi.string().default('gpt-4o-mini'),
        OPENAI_REASONING_MODEL: Joi.string().default('gpt-4o-mini'),
        OPENAI_REASONING_EFFORT: Joi.string().default('medium'),
        OPENAI_BASE_URL: Joi.string().default(
          'https://codex-api.packycode.com/v1',
        ),
        OPENAI_TEMPERATURE: Joi.number().default(0.7),
        OPENAI_MAX_TOKENS: Joi.number().default(2000),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3001),
        CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      envFilePath: ['.env.local', '.env'],
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
