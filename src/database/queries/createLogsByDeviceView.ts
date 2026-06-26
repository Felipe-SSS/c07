import { sql } from 'drizzle-orm';

export const createLogsByDeviceView = () => sql`
  CREATE OR REPLACE VIEW logs_by_device_view AS
  SELECT
    logs.id,
    logs.type,
    logs.category,
    logs.message,
    logs.metadata,
    logs.actor_user_id AS userId,
    logs.device_id AS deviceId,
    devices.mac_address AS deviceMacAddress,
    devices.mqtt_topic AS deviceMqttTopic,
    devices.connectivity_status AS deviceConnectivityStatus,
    logs.tv_id AS tvId,
    logs.created_at AS createdAt
  FROM logs
  INNER JOIN devices ON devices.id = logs.device_id
`;
