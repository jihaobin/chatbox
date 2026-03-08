"use client";

import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { Trash2Icon } from "lucide-react";

import { type Conversation } from "@/src/lib/api";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatTimestamp(value: string | null) {
  if (!value) {
    return "now";
  }

  try {
    return `${formatDistanceToNowStrict(parseISO(value))} ago`;
  } catch {
    return "now";
  }
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(conversation.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(conversation.id);
        }
      }}
      className={cn(
        "group w-full rounded-xl border px-3 py-2 text-left transition-colors",
        isActive
          ? "border-primary/40 bg-primary/10"
          : "border-transparent bg-transparent hover:border-border hover:bg-muted/50",
      )}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1 text-left">
          <div className="truncate text-sm font-medium">
            {conversation.title || "Untitled conversation"}
          </div>
        </div>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();
            if (window.confirm("Delete this conversation?")) {
              onDelete(conversation.id);
            }
          }}
          aria-label="Delete conversation"
          title="Delete conversation"
        >
          <Trash2Icon className="size-4" />
        </button>
      </div>
      {conversation.last_message_preview ? (
        <div className="text-muted-foreground mt-1 line-clamp-2 text-xs">
          {conversation.last_message_preview}
        </div>
      ) : null}
      <div className="text-muted-foreground mt-2 text-[11px]">
        {formatTimestamp(conversation.updated_at)}
      </div>
    </div>
  );
}
