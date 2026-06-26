import { sql } from 'drizzle-orm';

export const findLogsByDeviceId = (deviceId: number, limit: number, offset: number) => sql`
  SELECT id, type, category, message, metadata, userId, deviceId,
    deviceMacAddress, deviceMqttTopic, deviceConnectivityStatus, tvId, createdAt
  FROM logs_by_device_view
  WHERE deviceId = ${deviceId}
  ORDER BY createdAt DESC, id DESC
  LIMIT ${limit}
  OFFSET ${offset}
`;
