import { sql } from 'drizzle-orm';

export const findCommands = () => sql`
  SELECT id, type, payload, status, sent_at AS sentAt, responded_at AS respondedAt,
    created_by_user_id AS createdByUserId, device_id AS deviceId,
    created_at AS createdAt, updated_at AS updatedAt
  FROM commands
  ORDER BY id
`;
