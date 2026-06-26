import { sql } from 'drizzle-orm';

export const createLogsByTvView = () => sql`
  CREATE OR REPLACE VIEW logs_by_tv_view AS
  SELECT
    logs.id,
    logs.type,
    logs.category,
    logs.message,
    logs.metadata,
    logs.actor_user_id AS userId,
    logs.device_id AS deviceId,
    logs.tv_id AS tvId,
    tvs.brand AS tvBrand,
    tvs.model AS tvModel,
    tvs.serial_number AS tvSerialNumber,
    tvs.status AS tvStatus,
    logs.created_at AS createdAt
  FROM logs
  INNER JOIN tvs ON tvs.id = logs.tv_id
`;
