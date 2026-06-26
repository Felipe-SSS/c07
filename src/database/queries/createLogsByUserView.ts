import { sql } from 'drizzle-orm';

export const createLogsByUserView = () => sql`
  CREATE OR REPLACE VIEW logs_by_user_view AS
  SELECT
    logs.id,
    logs.type,
    logs.category,
    logs.message,
    logs.metadata,
    logs.actor_user_id AS userId,
    users.full_name AS userFullName,
    users.email AS userEmail,
    logs.device_id AS deviceId,
    logs.tv_id AS tvId,
    logs.created_at AS createdAt
  FROM logs
  INNER JOIN users ON users.id = logs.actor_user_id
`;
