import { BadRequestException } from '@nestjs/common';

export interface CursorPayload {
  createdAt?: string;
  updatedAt?: string;
  id: string;
}

export interface PaginatedResult<T> {
  items: T[];
  nextCursor: string | null;
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isIsoDateString(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

export function encodeCursor(payload: CursorPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export function decodeCursor(cursor: string): CursorPayload {
  try {
    const decoded = JSON.parse(
      Buffer.from(cursor, 'base64url').toString(),
    ) as CursorPayload;
    if (
      !decoded ||
      typeof decoded !== 'object' ||
      typeof decoded.id !== 'string' ||
      !UUID_REGEX.test(decoded.id)
    ) {
      throw new Error('Invalid cursor');
    }

    if (
      (decoded.createdAt !== undefined && !isIsoDateString(decoded.createdAt)) ||
      (decoded.updatedAt !== undefined && !isIsoDateString(decoded.updatedAt))
    ) {
      throw new Error('Invalid cursor');
    }

    return decoded;
  } catch {
    throw new BadRequestException('Invalid cursor format');
  }
}
