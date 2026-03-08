"use client";

import * as React from "react";

import { type Message } from "@/src/lib/api";
import { MessageItem } from "@/src/components/chat/MessageItem";
import { TypingIndicator } from "@/src/components/chat/TypingIndicator";

interface MessageListProps {
  conversationId: string | null;
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
}

export function MessageList({
  conversationId,
  messages,
  isLoading,
  isStreaming,
}: MessageListProps) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const bottomAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const shouldStickToBottomRef = React.useRef(true);

  React.useLayoutEffect(() => {
    const anchor = bottomAnchorRef.current;
    if (!anchor) {
      return;
    }

    shouldStickToBottomRef.current = true;
    anchor.scrollIntoView({ block: "end" });
  }, [conversationId]);

  React.useLayoutEffect(() => {
    const anchor = bottomAnchorRef.current;
    if (!anchor) {
      return;
    }

    if (!isStreaming && !shouldStickToBottomRef.current) {
      return;
    }

    anchor.scrollIntoView({ block: "end" });
  }, [messages.length, isStreaming]);

  const onScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    const distanceFromBottom =
      viewport.scrollHeight - (viewport.scrollTop + viewport.clientHeight);

    shouldStickToBottomRef.current = distanceFromBottom < 24;
  }, []);

  if (!messages.length && !isLoading) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center px-4 text-center text-sm">
        Start by creating a conversation and sending your first message.
      </div>
    );
  }

  return (
    <div
      ref={viewportRef}
      onScroll={onScroll}
      className="h-full overflow-y-auto px-4 py-5 md:px-6"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            isStreaming={
              isStreaming &&
              index === messages.length - 1 &&
              message.role === "assistant"
            }
          />
        ))}
        {isStreaming && <TypingIndicator />}
        <div ref={bottomAnchorRef} aria-hidden />
      </div>
    </div>
  );
}
