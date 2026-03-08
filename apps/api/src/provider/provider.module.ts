import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIProvider } from './openai/openai.provider';

@Module({
  imports: [ConfigModule],
  providers: [OpenAIProvider],
  exports: [OpenAIProvider],
})
export class ProviderModule {}
