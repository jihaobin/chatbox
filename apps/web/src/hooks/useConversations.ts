"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  type Conversation,
  createConversation,
  deleteConversation,
  listConversations,
} from "@/src/lib/api";
import type { SupportedChatModel } from "@/src/lib/models";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";

interface ConversationMetadata {
  id: string;
  title: string | null;
  last_message_preview?: string | null;
  updated_at: string;
}

const RECENT_CONVERSATIONS_KEY = "chatbox:conversations";
const ACTIVE_CONVERSATION_KEY = "chatbox:currentConversation";

function dedupeConversations(conversations: Conversation[]) {
  const seen = new Set<string>();
  const result: Conversation[] = [];

  for (const conversation of conversations) {
    if (!seen.has(conversation.id)) {
      seen.add(conversation.id);
      result.push(conversation);
    }
  }

  return result;
}

export function useConversations() {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCreating, setIsCreating] = React.useState(false);

  const [recentConversations, setRecentConversations] = useLocalStorage<
    ConversationMetadata[]
  >(RECENT_CONVERSATIONS_KEY, []);
  const [activeConversationId, setActiveConversationId] = useLocalStorage<
    string | null
  >(ACTIVE_CONVERSATION_KEY, null);
  const recentConversationsRef = React.useRef(recentConversations);

  React.useEffect(() => {
    recentConversationsRef.current = recentConversations;
  }, [recentConversations]);

  const syncLocalMetadata = React.useCallback(
    (items: Conversation[]) => {
      const metadata = items.map((item) => ({
        id: item.id,
        title: item.title,
        last_message_preview: item.last_message_preview,
        updated_at: item.updated_at,
      }));

      setRecentConversations(metadata);
    },
    [setRecentConversations],
  );

  const refreshConversations = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await listConversations({ limit: 100 });
      const nextConversations = response.data;
      setConversations(nextConversations);
      syncLocalMetadata(nextConversations);

      setActiveConversationId((previousActiveConversationId) => {
        if (previousActiveConversationId || nextConversations.length === 0) {
          return previousActiveConversationId;
        }

        return nextConversations[0].id;
      });
    } catch (error) {
      const fallback = recentConversationsRef.current.map<Conversation>(
        (item) => ({
          id: item.id,
          title: item.title,
          message_count: 0,
          last_message_at: item.updated_at,
          last_message_preview: item.last_message_preview,
          created_at: item.updated_at,
          updated_at: item.updated_at,
        }),
      );

      setConversations(dedupeConversations(fallback));

      const message =
        error instanceof Error ? error.message : "Failed to load conversations";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [setActiveConversationId, syncLocalMetadata]);

  React.useEffect(() => {
    void refreshConversations();
  }, [refreshConversations]);

  const createNewConversation = React.useCallback(
    async (title?: string, model?: SupportedChatModel) => {
      setIsCreating(true);
      try {
        const conversation = await createConversation({
          title,
          ai_settings: model ? { model } : undefined,
        });

        setConversations((previous) => {
          const next = dedupeConversations([conversation, ...previous]);
          syncLocalMetadata(next);
          return next;
        });

        setActiveConversationId(conversation.id);
        return conversation;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to create conversation";
        toast.error(message);
        return null;
      } finally {
        setIsCreating(false);
      }
    },
    [setActiveConversationId, syncLocalMetadata],
  );

  const setConversation = React.useCallback(
    (conversationId: string) => {
      setActiveConversationId(conversationId);
    },
    [setActiveConversationId],
  );

  const applyConversationTitleUpdate = React.useCallback(
    (conversationId: string, title: string) => {
      setConversations((previous) => {
        const next = previous.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, title }
            : conversation,
        );
        syncLocalMetadata(next);
        return next;
      });
    },
    [syncLocalMetadata],
  );

  const removeConversation = React.useCallback(
    async (conversationId: string) => {
      try {
        await deleteConversation(conversationId);
        setConversations((previous) => {
          const next = previous.filter(
            (conversation) => conversation.id !== conversationId,
          );
          syncLocalMetadata(next);

          setActiveConversationId((previousActiveConversationId) => {
            if (previousActiveConversationId !== conversationId) {
              return previousActiveConversationId;
            }

            return next[0]?.id ?? null;
          });

          return next;
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to delete conversation";
        toast.error(message);
      }
    },
    [setActiveConversationId, syncLocalMetadata],
  );

  return {
    conversations,
    isLoading,
    isCreating,
    activeConversationId,
    setConversation,
    deleteConversation: removeConversation,
    applyConversationTitleUpdate,
    createNewConversation,
    refreshConversations,
  };
}
