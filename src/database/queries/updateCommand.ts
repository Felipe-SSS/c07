import { SQL, sql } from 'drizzle-orm';
import { CreateCommandInput } from './createCommand';

export type UpdateCommandInput = Partial<CreateCommandInput>;

export const updateCommand = (id: number, input: UpdateCommandInput) => {
  // Cada campo opcional recebido no PATCH vira um trecho SQL independente.
  // Exemplo: { status: 'acknowledged', respondedAt: '2026-06-26T10:00:00Z' } gera:
  // UPDATE commands SET status = ?, responded_at = ? WHERE id = ?
  const updates: SQL[] = [];
  if (input.type !== undefined) updates.push(sql`type = ${input.type}`);
  if (input.payload !== undefined) updates.push(sql`payload = ${JSON.stringify(input.payload)}`);
  if (input.status !== undefined) updates.push(sql`status = ${input.status}`);
  if (input.sentAt !== undefined) updates.push(sql`sent_at = ${input.sentAt}`);
  if (input.respondedAt !== undefined) updates.push(sql`responded_at = ${input.respondedAt}`);
  if (input.createdByUserId !== undefined) updates.push(sql`created_by_user_id = ${input.createdByUserId}`);
  if (input.deviceId !== undefined) updates.push(sql`device_id = ${input.deviceId}`);

  // sql.join une os trechos usando virgula, mantendo os valores parametrizados
  // pelo Drizzle. Isso evita concatenar strings manualmente e reduz risco de SQL injection.
  return sql`
    UPDATE commands
    SET ${sql.join(updates, sql`, `)}
    WHERE id = ${id}
  `;
};
