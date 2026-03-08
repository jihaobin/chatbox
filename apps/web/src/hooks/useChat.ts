"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  type Message,
  listMessages,
  sendMessage,
  type SendMessageInput,
} from "@/src/lib/api";
import type { SupportedChatModel } from "@/src/lib/models";

function createTempId(prefix: string) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}`;
}

export function useChat(
  conversationId: string | null,
  model: SupportedChatModel,
  ensureConversation: () => Promise<string | null>,
) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const loadMessages = React.useCallback(async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await listMessages(conversationId, {
        limit: 100,
        include_ai_meta: true,
      });
      setMessages(response.data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load messages";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  React.useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  React.useEffect(
    () => () => {
      abortControllerRef.current?.abort();
    },
    [],
  );

  const send = React.useCallback(
    async (text: string) => {
      if (!text.trim()) {
        return;
      }

      let targetConversationId = conversationId;
      if (!targetConversationId) {
        targetConversationId = await ensureConversation();
      }

      if (!targetConversationId) {
        toast.error("Failed to create a conversation");
        return;
      }

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const userMessageId = createTempId("user");
      const assistantMessageId = createTempId("assistant");
      const now = new Date().toISOString();

      const optimisticUserMessage: Message = {
        id: userMessageId,
        conversation_id: targetConversationId,
        role: "user",
        content: { text },
        created_at: now,
      };

      const optimisticAssistantMessage: Message = {
        id: assistantMessageId,
        conversation_id: targetConversationId,
        role: "assistant",
        content: { text: "" },
        created_at: now,
        ai: {
          reasoningState: "pending",
        },
      };

      setMessages((previous) => [
        ...previous,
        optimisticUserMessage,
        optimisticAssistantMessage,
      ]);
      setIsStreaming(true);

      const payload: SendMessageInput = {
        client_message_id: createTempId("client"),
        content: { text },
        response: {
          stream: true,
          include_ai_meta: true,
        },
        ai_overrides: {
          model,
        },
      };

      try {
        await sendMessage(targetConversationId, payload, {
          signal: controller.signal,
          onEvent: (event) => {
            if (event.type === "message.delta") {
              setMessages((previous) =>
                previous.map((message) => {
                  if (message.id !== assistantMessageId) {
                    return message;
                  }

                  const previousText = message.content?.text ?? "";
                  return {
                    ...message,
                    content: {
                      text: `${previousText}${event.data.delta}`,
                    },
                  };
                }),
              );
            }

            if (event.type === "message.reasoning") {
              setMessages((previous) =>
                previous.map((message) => {
                  if (message.id !== assistantMessageId) {
                    return message;
                  }

                  const previousReasoningText =
                    message.ai?.reasoning?.text ?? "";

                  return {
                    ...message,
                    ai: {
                      ...(message.ai ?? {}),
                      reasoningState: "streaming",
                      reasoning: {
                        ...(message.ai?.reasoning ?? {}),
                        text: `${previousReasoningText}${event.data.delta}`,
                      },
                    },
                  };
                }),
              );
            }

            if (
              event.type === "message.completed" &&
              event.data.assistant_message
            ) {
              setMessages((previous) =>
                previous.map((message) => {
                  if (message.id !== assistantMessageId) {
                    return message;
                  }

                  const completedMessage = event.data.assistant_message!;
                  const existingReasoning = message.ai?.reasoning;
                  const completedReasoning = completedMessage.ai?.reasoning;

                  if (
                    existingReasoning?.text &&
                    !completedReasoning?.text &&
                    !(
                      completedReasoning?.steps &&
                      completedReasoning.steps.length > 0
                    ) &&
                    !completedReasoning?.summary
                  ) {
                    return {
                      ...completedMessage,
                      ai: {
                        ...(completedMessage.ai ?? {}),
                        reasoningState: "available",
                        reasoning: {
                          ...(completedReasoning ?? {}),
                          text: existingReasoning.text,
                        },
                      },
                    };
                  }

                  const hasCompletedReasoning =
                    Boolean(completedReasoning?.text?.trim()) ||
                    Boolean(completedReasoning?.summary?.trim()) ||
                    Boolean(
                      completedReasoning?.steps &&
                      completedReasoning.steps.length > 0,
                    );

                  return {
                    ...completedMessage,
                    ai: {
                      ...(completedMessage.ai ?? {}),
                      reasoningState: hasCompletedReasoning
                        ? "available"
                        : "unavailable",
                    },
                  };
                }),
              );
            }
          },
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setMessages((previous) =>
          previous.filter((message) => message.id !== assistantMessageId),
        );

        const message =
          error instanceof Error ? error.message : "Failed to send message";
        toast.error(message);
      } finally {
        setIsStreaming(false);
      }
    },
    [conversationId, ensureConversation, model],
  );

  return {
    messages,
    isLoading,
    isStreaming,
    sendMessage: send,
    reloadMessages: loadMessages,
  };
}
