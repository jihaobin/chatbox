"use client";

import { ChatInput } from "@/src/components/chat/ChatInput";
import { MessageList } from "@/src/components/chat/MessageList";
import { useChat } from "@/src/hooks/useChat";
import type { SupportedChatModel } from "@/src/lib/models";

interface ChatContainerProps {
  conversationId: string | null;
  model: SupportedChatModel;
  onModelChange: (model: SupportedChatModel) => void;
  ensureConversation: () => Promise<string | null>;
}

export function ChatContainer({
  conversationId,
  model,
  onModelChange,
  ensureConversation,
}: ChatContainerProps) {
  const { messages, isLoading, isStreaming, sendMessage } = useChat(
    conversationId,
    model,
    ensureConversation,
  );

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <MessageList
          conversationId={conversationId}
          messages={messages}
          isLoading={isLoading}
          isStreaming={isStreaming}
        />
      </div>
      <ChatInput
        isSending={isStreaming}
        model={model}
        onModelChange={onModelChange}
        onSend={sendMessage}
      />
    </div>
  );
}
