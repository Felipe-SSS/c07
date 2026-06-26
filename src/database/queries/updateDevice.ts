import { SQL, sql } from 'drizzle-orm';
import { CreateDeviceInput } from './createDevice';

export type UpdateDeviceInput = Partial<CreateDeviceInput>;

export const updateDevice = (id: number, input: UpdateDeviceInput) => {
  // Cada campo opcional recebido no PATCH vira um trecho SQL independente.
  // Exemplo: { connectivityStatus: 'online', mqttTopic: 'iotv/tv-01' } gera:
  // UPDATE devices SET connectivity_status = ?, mqtt_topic = ? WHERE id = ?
  const updates: SQL[] = [];
  if (input.macAddress !== undefined) updates.push(sql`mac_address = ${input.macAddress}`);
  if (input.firmwareVersion !== undefined) updates.push(sql`firmware_version = ${input.firmwareVersion}`);
  if (input.firmwareVersionId !== undefined) updates.push(sql`firmware_version_id = ${input.firmwareVersionId}`);
  if (input.mqttTopic !== undefined) updates.push(sql`mqtt_topic = ${input.mqttTopic}`);
  if (input.connectivityStatus !== undefined) updates.push(sql`connectivity_status = ${input.connectivityStatus}`);
  if (input.tvId !== undefined) updates.push(sql`tv_id = ${input.tvId}`);
  if (input.locationId !== undefined) updates.push(sql`location_id = ${input.locationId}`);

  // sql.join une os trechos usando virgula, mantendo os valores parametrizados
  // pelo Drizzle. Isso evita concatenar strings manualmente e reduz risco de SQL injection.
  return sql`
    UPDATE devices
    SET ${sql.join(updates, sql`, `)}
    WHERE id = ${id}
  `;
};
