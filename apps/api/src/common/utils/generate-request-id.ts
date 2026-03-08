import { randomUUID } from 'crypto';

/**
 * Generate a unique request ID for tracking
 * Uses crypto.randomUUID() for cryptographically secure unique identifiers
 */
export function generateRequestId(): string {
  return randomUUID();
}

/**
 * Extract or generate request ID from headers
 * @param headers Request headers object
 * @returns Existing request ID from header or new generated ID
 */
export function getRequestId(
  headers: Record<string, string | string[] | undefined>,
): string {
  const requestIdHeader = headers['x-request-id'] || headers['X-Request-ID'];
  if (Array.isArray(requestIdHeader)) {
    return requestIdHeader[0] || generateRequestId();
  }
  return requestIdHeader || generateRequestId();
}
