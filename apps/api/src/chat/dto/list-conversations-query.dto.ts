export type ConversationSortBy = 'updatedAt' | 'createdAt';

export class ListConversationsQueryDto {
  limit?: number | string;
  cursor?: string;
  sortBy?: ConversationSortBy;
}
