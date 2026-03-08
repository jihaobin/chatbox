const SENSITIVE_FIELDS = [
  'apiKey',
  'api_key',
  'password',
  'token',
  'secret',
  'authorization',
  'auth',
  'credential',
  'key',
];

const SENSITIVE_PATTERNS = [
  /Bearer\s+[A-Za-z0-9\-._~+/]+/gi,
  /sk-[a-zA-Z0-9]{48}/gi, // OpenAI API key pattern
];

/**
 * Mask an API key showing only first 4 and last 4 characters
 * @param key The API key to mask
 * @returns Masked key (e.g., "sk-***...***abcd")
 */
export function maskApiKey(key: string): string {
  if (!key || typeof key !== 'string') {
    return '[REDACTED]';
  }

  if (key.length <= 8) {
    return '***';
  }

  const first = key.substring(0, 4);
  const last = key.substring(key.length - 4);
  return `${first}...${last}`;
}

/**
 * Recursively sanitize an object by redacting sensitive fields
 * @param data The data to sanitize
 * @returns Sanitized data with sensitive values redacted
 */
export function sanitizeForLogging(data: unknown): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return sanitizeString(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForLogging(item));
  }

  if (typeof data === 'object') {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();

      if (SENSITIVE_FIELDS.some((field) => lowerKey.includes(field))) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeForLogging(value);
      }
    }

    return sanitized;
  }

  return data;
}

/**
 * Sanitize a string by removing sensitive patterns
 * @param str The string to sanitize
 * @returns Sanitized string
 */
function sanitizeString(str: string): string {
  let sanitized = str;

  for (const pattern of SENSITIVE_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[REDACTED]');
  }

  return sanitized;
}
