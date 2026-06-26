import { sql } from 'drizzle-orm';
import { JsonValue } from './types';

export type CreateLogInput = {
  type: string;
  category: string;
  message: string;
  metadata?: JsonValue;
  actorUserId?: number | null;
  deviceId?: number | null;
  tvId?: number | null;
};

export const createLog = (input: CreateLogInput) => sql`
  INSERT INTO logs (type, category, message, metadata, actor_user_id, device_id, tv_id)
  VALUES (
    ${input.type}, ${input.category}, ${input.message},
    ${input.metadata === undefined ? null : JSON.stringify(input.metadata)},
    ${input.actorUserId ?? null}, ${input.deviceId ?? null}, ${input.tvId ?? null}
  )
`;
