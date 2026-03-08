"use client";

import * as React from "react";
import { MessageSquareTextIcon, PanelLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatContainer } from "@/src/components/chat/ChatContainer";
import { ConversationList } from "@/src/components/conversation/ConversationList";
import { useConversations } from "@/src/hooks/useConversations";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { subscribeConversationEvents } from "@/src/lib/api";
import {
  DEFAULT_CHAT_MODEL,
  isSupportedChatModel,
  type SupportedChatModel,
} from "@/src/lib/models";

export default function Page() {
  const {
    conversations,
    isLoading,
    isCreating,
    activeConversationId,
    setConversation,
    createNewConversation,
    deleteConversation,
    applyConversationTitleUpdate,
  } = useConversations();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [model, setModel] = useLocalStorage<SupportedChatModel>(
    "chatbox:model",
    DEFAULT_CHAT_MODEL,
  );
  const selectedModel = isSupportedChatModel(model)
    ? model
    : DEFAULT_CHAT_MODEL;

  React.useEffect(() => {
    if (!isSupportedChatModel(model)) {
      setModel(DEFAULT_CHAT_MODEL);
    }
  }, [model, setModel]);

  const ensureConversation = React.useCallback(async () => {
    if (activeConversationId) {
      return activeConversationId;
    }

    const createdConversation = await createNewConversation(
      undefined,
      selectedModel,
    );

    return createdConversation?.id ?? null;
  }, [activeConversationId, createNewConversation, selectedModel]);

  React.useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    const unsubscribe = subscribeConversationEvents(
      activeConversationId,
      (event) => {
        if (event.type === "conversation.title.updated") {
          applyConversationTitleUpdate(
            event.data.conversationId,
            event.data.title,
          );
        }
      },
    );

    return () => {
      unsubscribe();
    };
  }, [activeConversationId, applyConversationTitleUpdate]);

  return (
    <main className="flex h-dvh bg-background">
      <aside className="hidden w-80 border-r border-border/80 bg-card/40 md:block">
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          isLoading={isLoading}
          isCreating={isCreating}
          onCreateConversation={() =>
            createNewConversation(undefined, selectedModel)
          }
          onSelectConversation={setConversation}
          onDeleteConversation={deleteConversation}
        />
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-border/80 px-3 py-2 md:hidden">
          <div className="flex items-center justify-between">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger
                render={
                  <Button size="icon-sm" variant="outline">
                    <PanelLeftIcon />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-[85vw] p-0">
                <SheetHeader className="border-b border-border/70">
                  <SheetTitle>Conversations</SheetTitle>
                  <SheetDescription>
                    Switch chats or create a new one.
                  </SheetDescription>
                </SheetHeader>
                <ConversationList
                  conversations={conversations}
                  activeConversationId={activeConversationId}
                  isLoading={isLoading}
                  isCreating={isCreating}
                  onCreateConversation={async () => {
                    await createNewConversation(undefined, selectedModel);
                    setIsSidebarOpen(false);
                  }}
                  onSelectConversation={(id) => {
                    setConversation(id);
                    setIsSidebarOpen(false);
                  }}
                  onDeleteConversation={async (id) => {
                    await deleteConversation(id);
                  }}
                />
              </SheetContent>
            </Sheet>
            <div className="inline-flex items-center gap-2 text-sm font-medium">
              <MessageSquareTextIcon className="size-4" />
              Chatbox
            </div>
            <div className="w-7" />
          </div>
        </header>
        <div className="min-h-0 flex-1">
          <ChatContainer
            conversationId={activeConversationId}
            model={selectedModel}
            onModelChange={setModel}
            ensureConversation={ensureConversation}
          />
        </div>
      </section>
    </main>
  );
}
