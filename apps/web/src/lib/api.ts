import type { SupportedChatModel } from "@/src/lib/models";

export type Role = "system" | "user" | "assistant" | "tool";

export interface Conversation {
  id: string;
  title: string | null;
  message_count: number;
  last_message_at: string | null;
  last_message_preview?: string | null;
  created_at: string;
  updated_at: string;
}

function normalizeConversation(raw: unknown): Conversation | null {
  if (!isRecord(raw)) {
    return null;
  }

  const id = toStringOrNull(raw.id);
  const createdAt =
    toStringOrNull(raw.created_at) ?? toStringOrNull(raw.createdAt);
  const updatedAt =
    toStringOrNull(raw.updated_at) ?? toStringOrNull(raw.updatedAt);

  if (!id || !createdAt || !updatedAt) {
    return null;
  }

  const messageCount =
    typeof raw.message_count === "number"
      ? raw.message_count
      : typeof raw.messageCount === "number"
        ? raw.messageCount
        : 0;

  return {
    id,
    title: toStringOrNull(raw.title),
    message_count: messageCount,
    last_message_at:
      toStringOrNull(raw.last_message_at) ?? toStringOrNull(raw.lastMessageAt),
    last_message_preview:
      toStringOrNull(raw.last_message_preview) ??
      toStringOrNull(raw.lastMessagePreview),
    created_at: createdAt,
    updated_at: updatedAt,
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  role: Role;
  content: {
    text: string;
  } | null;
  created_at: string;
  ai?: {
    reasoningState?: "pending" | "streaming" | "available" | "unavailable";
    reasoning?: {
      summary?: string;
      steps?: string[];
      text?: string;
    };
    [key: string]: unknown;
  } | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function normalizeMessage(raw: unknown): Message | null {
  if (!isRecord(raw)) {
    return null;
  }

  const id = toStringOrNull(raw.id);
  const role = toStringOrNull(raw.role) as Role | null;
  const conversationId =
    toStringOrNull(raw.conversation_id) ?? toStringOrNull(raw.conversationId);
  const createdAt =
    toStringOrNull(raw.created_at) ?? toStringOrNull(raw.createdAt);

  if (!id || !role || !conversationId || !createdAt) {
    return null;
  }

  let text: string | null = null;
  if (isRecord(raw.content)) {
    text = toStringOrNull(raw.content.text);
  }

  text =
    text ?? toStringOrNull(raw.contentText) ?? toStringOrNull(raw.content_text);

  const rawAiValue = isRecord(raw.ai)
    ? raw.ai
    : isRecord(raw.aiGeneration)
      ? raw.aiGeneration
      : null;

  let aiValue: Message["ai"] = null;
  if (rawAiValue) {
    const responseJson = isRecord(rawAiValue.responseJson)
      ? rawAiValue.responseJson
      : isRecord(rawAiValue.response_json)
        ? rawAiValue.response_json
        : null;
    const reasoning =
      responseJson && isRecord(responseJson.reasoning)
        ? responseJson.reasoning
        : null;

    aiValue = {
      ...(rawAiValue as Record<string, unknown>),
      reasoning: reasoning
        ? {
            summary: toStringOrNull(reasoning.summary) ?? undefined,
            steps: Array.isArray(reasoning.steps)
              ? reasoning.steps.filter(
                  (item): item is string => typeof item === "string",
                )
              : undefined,
            text: toStringOrNull(reasoning.text) ?? undefined,
          }
        : undefined,
    };
  }

  return {
    id,
    conversation_id: conversationId,
    role,
    content: text !== null ? { text } : null,
    created_at: createdAt,
    ai: aiValue,
  };
}

export interface PaginationMeta {
  limit?: number;
  next_cursor?: string | null;
}

export interface ListResponse<T> {
  data: T[];
  meta?: {
    request_id?: string;
    page?: PaginationMeta;
  };
}

export interface ResourceResponse<T> {
  data: T;
  meta?: {
    request_id?: string;
  };
}

export interface CreateConversationInput {
  title?: string;
  ai_settings?: {
    model?: SupportedChatModel;
  };
}

export interface SendMessageInput {
  client_message_id?: string;
  content: {
    text: string;
  };
  response?: {
    stream?: boolean;
    include_ai_meta?: boolean;
  };
  ai_overrides?: {
    model?: SupportedChatModel;
  };
}

export interface SendMessageResponse {
  user_message?: Message;
  assistant_message?: Message;
}

export interface ListMessagesInput {
  limit?: number;
  before?: string;
  include_ai_meta?: boolean;
}

export interface ListConversationsInput {
  limit?: number;
  cursor?: string;
}

export type ChatStreamEvent =
  | {
      type: "message.created";
      data: {
        assistant_message_id?: string;
        generation_id?: string;
      };
    }
  | {
      type: "message.delta";
      data: {
        delta: string;
      };
    }
  | {
      type: "message.reasoning";
      data: {
        delta: string;
      };
    }
  | {
      type: "message.completed";
      data: {
        assistant_message?: Message;
      };
    }
  | {
      type: "error";
      data: {
        title?: string;
        detail?: string;
        message?: string;
        code?: string;
      };
    };

export type ConversationSseEvent = {
  type: "conversation.title.updated";
  data: {
    conversationId: string;
    title: string;
  };
};

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(
    message: string,
    status: number,
    details?: unknown,
    code?: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function toApiError(
  error: unknown,
  fallbackMessage: string,
): ApiError | unknown {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return error;
  }

  const isOffline =
    typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
      ? !navigator.onLine
      : false;

  if (isOffline) {
    return new ApiError(
      "Network disconnected. Please check your internet connection.",
      0,
      { cause: error },
      "NETWORK_DISCONNECTED",
    );
  }

  if (error instanceof TypeError) {
    return new ApiError(
      "Unable to reach the server. Please check your network and try again.",
      0,
      { cause: error.message },
      "NETWORK_ERROR",
    );
  }

  if (error instanceof Error) {
    return new ApiError(error.message || fallbackMessage, 0, {
      cause: error.message,
    });
  }

  return new ApiError(fallbackMessage, 0, { cause: error });
}

function getApiBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configured) {
    return "http://localhost:3001/v1";
  }

  return configured.replace(/\/$/, "");
}

const API_BASE_URL = getApiBaseUrl();

function toQueryString(
  params: Record<string, string | number | boolean | undefined>,
) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      query.set(key, String(value));
    }
  }

  const serialized = query.toString();
  return serialized ? `?${serialized}` : "";
}

async function parseError(response: Response): Promise<ApiError> {
  const contentType = response.headers.get("content-type") ?? "";

  if (
    contentType.includes("application/json") ||
    contentType.includes("application/problem+json")
  ) {
    const payload = await response.json().catch(() => null);
    const message =
      payload?.title ??
      payload?.detail ??
      payload?.message ??
      `Request failed with ${response.status}`;

    return new ApiError(message, response.status, payload, payload?.code);
  }

  const text = await response.text().catch(() => "");
  return new ApiError(
    text || `Request failed with ${response.status}`,
    response.status,
  );
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw await parseError(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    throw toApiError(error, "Request failed");
  }
}

async function streamSse(
  response: Response,
  onEvent: (event: ChatStreamEvent) => void,
): Promise<ChatStreamEvent | null> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";

  if (!contentType.includes("text/event-stream")) {
    const payload = (await response.json().catch(() => null)) as {
      data?: {
        assistant_message?: Message;
        assistantMessage?: Message;
      };
    } | null;

    const assistantMessage = normalizeMessage(
      payload?.data?.assistant_message ?? payload?.data?.assistantMessage,
    );

    if (assistantMessage) {
      const fallbackEvent: ChatStreamEvent = {
        type: "message.completed",
        data: {
          assistant_message: assistantMessage,
        },
      };
      onEvent(fallbackEvent);
      return fallbackEvent;
    }

    throw new ApiError(
      "Streaming response expected but server returned a non-stream payload.",
      response.status,
      payload,
      "STREAM_PROTOCOL_MISMATCH",
    );
  }

  if (!response.body) {
    throw new ApiError("SSE response body is missing", response.status);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let lastEvent: ChatStreamEvent | null = null;

  const parseChunk = (chunk: string) => {
    const blocks = chunk.split("\n\n");
    buffer = blocks.pop() ?? "";

    for (const block of blocks) {
      if (!block.trim()) {
        continue;
      }

      let eventName = "message";
      const dataLines: string[] = [];

      for (const line of block.split("\n")) {
        if (line.startsWith("event:")) {
          eventName = line.slice(6).trim();
        }

        if (line.startsWith("data:")) {
          dataLines.push(line.slice(5).trim());
        }
      }

      const dataRaw = dataLines.join("\n");
      let parsedData: unknown = {};

      if (dataRaw) {
        try {
          parsedData = JSON.parse(dataRaw);
        } catch {
          parsedData = { message: dataRaw };
        }
      }

      const event = {
        type: eventName,
        data: parsedData,
      } as ChatStreamEvent;

      if (
        event.type === "message.created" &&
        event.data &&
        typeof event.data === "object"
      ) {
        const createdData = event.data as {
          assistant_message_id?: string;
          generation_id?: string;
          assistantMessageId?: string;
          generationId?: string;
        };

        if (createdData.assistantMessageId || createdData.generationId) {
          event.data = {
            assistant_message_id:
              createdData.assistant_message_id ??
              createdData.assistantMessageId,
            generation_id:
              createdData.generation_id ?? createdData.generationId,
          };
        }
      }

      if (
        event.type === "message.completed" &&
        event.data &&
        typeof event.data === "object"
      ) {
        const completedData = event.data as {
          assistant_message?: Message;
          assistantMessage?: Message;
        };

        const normalizedAssistantMessage = normalizeMessage(
          completedData.assistant_message ?? completedData.assistantMessage,
        );

        if (normalizedAssistantMessage) {
          event.data = {
            assistant_message: normalizedAssistantMessage,
          };
        }
      }

      lastEvent = event;
      onEvent(event);

      if (event.type === "error") {
        const errorMessage =
          event.data.detail ??
          event.data.title ??
          event.data.message ??
          "Streaming request failed";
        throw new ApiError(
          errorMessage,
          response.status,
          event.data,
          event.data.code,
        );
      }
    }
  };

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    parseChunk(buffer);
  }

  if (buffer.trim()) {
    parseChunk(`${buffer}\n\n`);
  }

  return lastEvent;
}

export async function createConversation(input: CreateConversationInput = {}) {
  const payload = await requestJson<ResourceResponse<unknown>>(
    "/conversations",
    {
      method: "POST",
      body: JSON.stringify({
        title: input.title,
        aiSettings: input.ai_settings,
      }),
    },
  );

  const normalized = normalizeConversation(payload.data);
  if (!normalized) {
    throw new ApiError("Invalid conversation payload", 500, payload.data);
  }

  return normalized;
}

export async function listConversations(input: ListConversationsInput = {}) {
  const query = toQueryString({
    limit: input.limit,
    cursor: input.cursor,
  });

  const payload = await requestJson<ListResponse<unknown>>(
    `/conversations${query}`,
  );

  return {
    ...payload,
    data: payload.data
      .map((item) => normalizeConversation(item))
      .filter((item): item is Conversation => item !== null),
  };
}

export async function getConversation(conversationId: string) {
  const payload = await requestJson<ResourceResponse<unknown>>(
    `/conversations/${conversationId}`,
  );

  const normalized = normalizeConversation(payload.data);
  if (!normalized) {
    throw new ApiError("Invalid conversation payload", 500, payload.data);
  }

  return normalized;
}

export async function deleteConversation(conversationId: string) {
  await requestJson<unknown>(`/conversations/${conversationId}`, {
    method: "DELETE",
  });
}

export function subscribeConversationEvents(
  conversationId: string,
  onEvent: (event: ConversationSseEvent) => void,
  onError?: (error: Event) => void,
): () => void {
  const eventSource = new EventSource(
    `${API_BASE_URL}/conversations/${conversationId}/events`,
    {
      withCredentials: true,
    },
  );

  const onTitleUpdated = (event: MessageEvent<string>) => {
    try {
      const payload = JSON.parse(event.data) as {
        conversationId?: string;
        title?: string;
      };

      if (
        typeof payload.conversationId !== "string" ||
        typeof payload.title !== "string"
      ) {
        return;
      }

      onEvent({
        type: "conversation.title.updated",
        data: {
          conversationId: payload.conversationId,
          title: payload.title,
        },
      });
    } catch {
      return;
    }
  };

  eventSource.addEventListener(
    "conversation.title.updated",
    onTitleUpdated as EventListener,
  );

  eventSource.onerror = (event) => {
    onError?.(event);
  };

  return () => {
    eventSource.removeEventListener(
      "conversation.title.updated",
      onTitleUpdated as EventListener,
    );
    eventSource.close();
  };
}

export async function listMessages(
  conversationId: string,
  input: ListMessagesInput = {},
) {
  const query = toQueryString({
    limit: input.limit,
    before: input.before,
    include_ai_meta: input.include_ai_meta,
  });

  const payload = await requestJson<ListResponse<unknown>>(
    `/conversations/${conversationId}/messages${query}`,
  );

  return {
    ...payload,
    data: payload.data
      .map((item) => normalizeMessage(item))
      .filter((item): item is Message => item !== null),
  };
}

export async function sendMessage(
  conversationId: string,
  input: SendMessageInput,
  options?: {
    signal?: AbortSignal;
    onEvent?: (event: ChatStreamEvent) => void;
  },
) {
  const shouldStream = input.response?.stream ?? true;
  const streamQuery = shouldStream ? "?stream=true" : "";

  try {
    const response = await fetch(
      `${API_BASE_URL}/conversations/${conversationId}/messages${streamQuery}`,
      {
        method: "POST",
        credentials: "include",
        signal: options?.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: shouldStream ? "text/event-stream" : "application/json",
        },
        body: JSON.stringify({
          clientMessageId: input.client_message_id,
          content: input.content,
          response: {
            stream: shouldStream,
            includeAiMeta: input.response?.include_ai_meta ?? true,
          },
          aiOverrides: input.ai_overrides,
        }),
      },
    );

    if (!response.ok) {
      throw await parseError(response);
    }

    if (!shouldStream) {
      const payload =
        (await response.json()) as ResourceResponse<SendMessageResponse>;
      return payload.data;
    }

    const finalEvent = await streamSse(response, (event) => {
      options?.onEvent?.(event);
    });

    if (
      finalEvent?.type === "message.completed" &&
      finalEvent.data.assistant_message
    ) {
      return {
        assistant_message: finalEvent.data.assistant_message,
      };
    }

    return null;
  } catch (error) {
    throw toApiError(error, "Failed to send message");
  }
}
