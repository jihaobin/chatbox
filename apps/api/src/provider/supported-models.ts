export const SUPPORTED_CHAT_MODELS = ['gpt-5.4', 'gpt-5.4-codex'] as const;

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
