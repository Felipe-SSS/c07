import { sql } from 'drizzle-orm';
import { JsonValue } from './types';

export type CreateCommandInput = {
  type: 'turn_on' | 'turn_off' | 'restart' | 'update_firmware';
  payload?: JsonValue;
  status?: 'pending' | 'sent' | 'acknowledged' | 'failed';
  sentAt?: string | null;
  respondedAt?: string | null;
  createdByUserId: number;
  deviceId: number;
};

export const createCommand = (input: CreateCommandInput) => sql`
  INSERT INTO commands (
    type, payload, status, sent_at, responded_at, created_by_user_id, device_id
  )
  VALUES (
    ${input.type}, ${input.payload === undefined ? null : JSON.stringify(input.payload)},
    ${input.status ?? 'pending'}, ${input.sentAt ?? null}, ${input.respondedAt ?? null},
    ${input.createdByUserId}, ${input.deviceId}
  )
`;
