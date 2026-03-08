"use client";

import { ConversationItem } from "@/src/components/conversation/ConversationItem";
import { NewConversationButton } from "@/src/components/conversation/NewConversationButton";
import { type Conversation } from "@/src/lib/api";
import { isToday, isYesterday, parseISO, subDays } from "date-fns";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  isCreating: boolean;
  onCreateConversation: () => Promise<unknown> | void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => Promise<void> | void;
}

function toGroupLabel(conversation: Conversation): string {
  const timestamp = conversation.last_message_at ?? conversation.updated_at;

  try {
    const date = parseISO(timestamp);
    if (isToday(date)) {
      return "Today";
    }

    if (isYesterday(date)) {
      return "Yesterday";
    }

    if (date >= subDays(new Date(), 7)) {
      return "Last 7 days";
    }

    return "Earlier";
  } catch {
    return "Earlier";
  }
}

export function ConversationList({
  conversations,
  activeConversationId,
  isLoading,
  isCreating,
  onCreateConversation,
  onSelectConversation,
  onDeleteConversation,
}: ConversationListProps) {
  const groupedConversations = conversations.reduce<
    Array<{ label: string; items: Conversation[] }>
  >((groups, conversation) => {
    const label = toGroupLabel(conversation);
    const existingGroup = groups.find((group) => group.label === label);

    if (existingGroup) {
      existingGroup.items.push(conversation);
      return groups;
    }

    groups.push({ label, items: [conversation] });
    return groups;
  }, []);

  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <NewConversationButton
        onCreate={onCreateConversation}
        isLoading={isCreating}
      />
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {isLoading && conversations.length === 0 ? (
          <div className="text-muted-foreground rounded-xl border border-dashed border-border/70 p-3 text-sm">
            Loading conversations...
          </div>
        ) : null}
        {!isLoading && conversations.length === 0 ? (
          <div className="text-muted-foreground rounded-xl border border-dashed border-border/70 p-3 text-sm">
            No conversations yet.
          </div>
        ) : null}
        {groupedConversations.map((group) => (
          <div key={group.label} className="space-y-2">
            <div className="text-muted-foreground px-1 text-[11px] font-medium uppercase tracking-wide">
              {group.label}
            </div>
            {group.items.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeConversationId === conversation.id}
                onSelect={onSelectConversation}
                onDelete={onDeleteConversation}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
