import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIConfigService {
  constructor(private configService: ConfigService) {}

  get apiKey(): string {
    return this.configService.get<string>('openai.apiKey')!;
  }

  get defaultModel(): string {
    return this.configService.get<string>('openai.model')!;
  }

  get defaultTemperature(): number {
    return this.configService.get<number>('openai.temperature')!;
  }

  get defaultMaxTokens(): number {
    return this.configService.get<number>('openai.maxTokens')!;
  }

  get baseURL(): string | undefined {
    return this.configService.get<string>('openai.baseURL');
  }
}
