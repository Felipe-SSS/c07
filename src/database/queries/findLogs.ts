import { sql } from 'drizzle-orm';

export const findLogs = (limit: number, offset: number) => sql`
  SELECT id, type, category, message, metadata, actor_user_id AS actorUserId,
    device_id AS deviceId, tv_id AS tvId, created_at AS createdAt
  FROM logs
  ORDER BY createdAt DESC, id DESC
  LIMIT ${limit}
  OFFSET ${offset}
`;
