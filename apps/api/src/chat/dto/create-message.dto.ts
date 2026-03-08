import type { AiSettingsDto } from './create-conversation.dto';

export interface MessageContentDto {
  text: string;
}

export interface MessageResponseOptionsDto {
  stream?: boolean;
  includeAiMeta?: boolean;
}

export interface MessageAiOverridesDto extends AiSettingsDto {}

export class CreateMessageDto {
  clientMessageId?: string;
  content!: MessageContentDto;
  response?: MessageResponseOptionsDto;
  aiOverrides?: MessageAiOverridesDto;
}
