import { ErrorTemplate } from './problem-detail.types';

/**
 * OpenAI error code to ProblemDetail template mapping
 * Maps OpenAI API errors to user-friendly Chinese messages
 */
export const OPENAI_ERROR_MAP: Record<string, ErrorTemplate> = {
  rate_limit_exceeded: {
    type: '/problems/rate-limited',
    title: '请求过于频繁',
    status: 429,
    code: 'RATE_LIMIT_EXCEEDED',
    detail: '您的请求频率过高，请稍后再试',
  },

  insufficient_quota: {
    type: '/problems/service-unavailable',
    title: '服务暂时不可用',
    status: 503,
    code: 'INSUFFICIENT_QUOTA',
    detail: 'API 配额不足，请联系管理员',
  },

  context_length_exceeded: {
    type: '/problems/message-too-long',
    title: '消息过长',
    status: 422,
    code: 'CONTEXT_LENGTH_EXCEEDED',
    detail: '消息内容超出长度限制，请缩短后重试',
  },

  invalid_api_key: {
    type: '/problems/service-unavailable',
    title: '服务暂时不可用',
    status: 503,
    code: 'INVALID_API_KEY',
    detail: 'API 配置错误，请联系管理员',
  },

  server_error: {
    type: '/problems/service-unavailable',
    title: '服务暂时不可用',
    status: 503,
    code: 'SERVER_ERROR',
    detail: 'AI 服务暂时不可用，请稍后再试',
  },

  service_unavailable: {
    type: '/problems/service-unavailable',
    title: '服务暂时不可用',
    status: 503,
    code: 'SERVICE_UNAVAILABLE',
    detail: 'AI 服务暂时不可用，请稍后再试',
  },

  model_not_found: {
    type: '/problems/not-found',
    title: '模型不存在',
    status: 404,
    code: 'MODEL_NOT_FOUND',
    detail: '请求的 AI 模型不存在或已下线',
  },

  invalid_request: {
    type: '/problems/bad-request',
    title: '请求参数错误',
    status: 400,
    code: 'INVALID_REQUEST',
    detail: '请求参数不正确，请检查后重试',
  },

  content_policy_violation: {
    type: '/problems/content-policy',
    title: '内容违规',
    status: 400,
    code: 'CONTENT_POLICY_VIOLATION',
    detail: '请求内容违反内容策略，请修改后重试',
  },
};

/**
 * Get error template for OpenAI error code
 * @param errorCode OpenAI error code
 * @returns Error template or default 500 error
 */
export function getOpenAIErrorTemplate(errorCode: string): ErrorTemplate {
  return (
    OPENAI_ERROR_MAP[errorCode] || {
      type: '/problems/service-unavailable',
      title: '服务暂时不可用',
      status: 503,
      code: 'UNKNOWN_ERROR',
      detail: 'AI 服务发生未知错误，请稍后再试',
    }
  );
}
