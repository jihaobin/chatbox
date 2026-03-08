export interface AiSettingsDto {
  model?: string;
  temperature?: number;
  topP?: number;
  maxOutputTokens?: number;
  systemPrompt?: string;
}

export class CreateConversationDto {
  title?: string;
  aiSettings?: AiSettingsDto;
}
