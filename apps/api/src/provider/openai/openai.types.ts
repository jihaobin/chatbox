import type OpenAI from 'openai';
import type {
  GenerateRequest,
  GenerateResponse,
  Message,
  StreamEvent,
} from '../model-provider.interface';

export type OpenAIMessageParam =
  OpenAI.Chat.Completions.ChatCompletionMessageParam;

export type OpenAIChatCompletion = OpenAI.Chat.Completions.ChatCompletion;

export type OpenAIChatCompletionCreateParams =
  OpenAI.Chat.Completions.ChatCompletionCreateParams;

export type OpenAIChatCompletionCreateParamsStreaming =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming;

export type OpenAIChatCompletionCreateParamsNonStreaming =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

export type OpenAIChatCompletionChunk =
  OpenAI.Chat.Completions.ChatCompletionChunk;

export interface OpenAIGenerateContext {
  model: string;
  messages: Message[];
}

export type OpenAIGenerateRequest = GenerateRequest;

export type OpenAIGenerateResponse = GenerateResponse;

export type OpenAIStreamEvent = StreamEvent;
