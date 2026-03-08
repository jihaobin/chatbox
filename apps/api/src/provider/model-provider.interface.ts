export type MessageRole = 'system' | 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
}

export interface GenerateRequest {
  model?: string;
  messages: Message[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  systemPrompt?: string;
}

export interface GenerateResponse {
  id: string;
  model: string;
  content: string;
  finishReason?: string | null;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export type StreamEvent =
  | {
      type: 'start';
      id: string;
      model: string;
    }
  | {
      type: 'chunk';
      delta: string;
    }
  | {
      type: 'reasoning';
      delta: string;
    }
  | {
      type: 'end';
      finishReason?: string | null;
      usage?: {
        promptTokens?: number;
        completionTokens?: number;
        totalTokens?: number;
      };
    }
  | {
      type: 'error';
      error: string;
    };

export interface ModelProvider {
  generateResponse(request: GenerateRequest): Promise<GenerateResponse>;
  streamResponse(
    request: GenerateRequest,
  ): AsyncGenerator<StreamEvent, void, void>;
  countTokens(messages: Message[], model?: string): Promise<number>;
}
