import { Injectable } from '@nestjs/common';

export interface ConversationEvent {
  type: 'conversation.title.updated';
  data: {
    conversationId: string;
    title: string;
  };
}

type ConversationEventListener = (event: ConversationEvent) => void;

@Injectable()
export class ChatEventsService {
  private readonly listeners = new Map<
    string,
    Set<ConversationEventListener>
  >();

  subscribe(
    conversationId: string,
    listener: ConversationEventListener,
  ): () => void {
    const conversationListeners =
      this.listeners.get(conversationId) ?? new Set();
    conversationListeners.add(listener);
    this.listeners.set(conversationId, conversationListeners);

    return () => {
      const currentListeners = this.listeners.get(conversationId);
      if (!currentListeners) {
        return;
      }

      currentListeners.delete(listener);
      if (currentListeners.size === 0) {
        this.listeners.delete(conversationId);
      }
    };
  }

  emit(event: ConversationEvent): void {
    const conversationListeners = this.listeners.get(event.data.conversationId);
    if (!conversationListeners || conversationListeners.size === 0) {
      return;
    }

    for (const listener of conversationListeners) {
      listener(event);
    }
  }
}
