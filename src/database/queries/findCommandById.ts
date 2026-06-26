import { sql } from 'drizzle-orm';

export const findCommandById = (id: number) => sql`
  SELECT id, type, payload, status, sent_at AS sentAt, responded_at AS respondedAt,
    created_by_user_id AS createdByUserId, device_id AS deviceId,
    created_at AS createdAt, updated_at AS updatedAt
  FROM commands
  WHERE id = ${id}
  LIMIT 1
`;
