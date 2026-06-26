import { sql } from 'drizzle-orm';

export const findLogsByUserId = (userId: number, limit: number, offset: number) => sql`
  SELECT id, type, category, message, metadata, userId, userFullName, userEmail,
    deviceId, tvId, createdAt
  FROM logs_by_user_view
  WHERE userId = ${userId}
  ORDER BY createdAt DESC, id DESC
  LIMIT ${limit}
  OFFSET ${offset}
`;
