export const SUPPORTED_CHAT_MODELS = ["gpt-5.4", "gpt-5.4-codex"] as const;

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];

export const DEFAULT_CHAT_MODEL: SupportedChatModel = SUPPORTED_CHAT_MODELS[0];

export function isSupportedChatModel(value: unknown): value is SupportedChatModel {
  return (
    typeof value === "string" &&
    (SUPPORTED_CHAT_MODELS as readonly string[]).includes(value)
  );
}
