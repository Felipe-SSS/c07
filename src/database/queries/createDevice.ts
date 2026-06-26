import { sql } from 'drizzle-orm';

export type CreateDeviceInput = {
  macAddress: string;
  firmwareVersion: string;
  firmwareVersionId?: number | null;
  mqttTopic: string;
  connectivityStatus?: 'online' | 'offline';
  tvId: number;
  locationId: number;
};

export const createDevice = (input: CreateDeviceInput) => sql`
  INSERT INTO devices (
    mac_address, firmware_version, firmware_version_id, mqtt_topic,
    connectivity_status, tv_id, location_id
  )
  VALUES (
    ${input.macAddress}, ${input.firmwareVersion}, ${input.firmwareVersionId ?? null}, ${input.mqttTopic},
    ${input.connectivityStatus ?? 'offline'}, ${input.tvId}, ${input.locationId}
  )
`;
