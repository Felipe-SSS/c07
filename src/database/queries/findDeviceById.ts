import { sql } from 'drizzle-orm';

export const findDeviceById = (id: number) => sql`
  SELECT id, mac_address AS macAddress, firmware_version AS firmwareVersion,
    firmware_version_id AS firmwareVersionId, mqtt_topic AS mqttTopic,
    connectivity_status AS connectivityStatus, tv_id AS tvId, location_id AS locationId,
    created_at AS createdAt, updated_at AS updatedAt
  FROM devices
  WHERE id = ${id}
  LIMIT 1
`;
