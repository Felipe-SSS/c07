import { sql } from 'drizzle-orm';

export const findLogsByTvId = (tvId: number, limit: number, offset: number) => sql`
  SELECT id, type, category, message, metadata, userId, deviceId, tvId,
    tvBrand, tvModel, tvSerialNumber, tvStatus, createdAt
  FROM logs_by_tv_view
  WHERE tvId = ${tvId}
  ORDER BY createdAt DESC, id DESC
  LIMIT ${limit}
  OFFSET ${offset}
`;
