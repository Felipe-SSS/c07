import { SQL, sql } from 'drizzle-orm';
import { CreateLogInput } from './createLog';

export type UpdateLogInput = Partial<CreateLogInput>;

export const updateLog = (id: number, input: UpdateLogInput) => {
  // Cada campo opcional recebido no PATCH vira um trecho SQL independente.
  // Exemplo: { category: 'device', message: 'Device voltou a ficar online' } gera:
  // UPDATE logs SET category = ?, message = ? WHERE id = ?
  // Campos undefined sao ignorados para evitar sobrescrever dados existentes.
  const updates: SQL[] = [];
  if (input.type !== undefined) updates.push(sql`type = ${input.type}`);
  if (input.category !== undefined) updates.push(sql`category = ${input.category}`);
  if (input.message !== undefined) updates.push(sql`message = ${input.message}`);
  if (input.metadata !== undefined) updates.push(sql`metadata = ${JSON.stringify(input.metadata)}`);
  if (input.actorUserId !== undefined) updates.push(sql`actor_user_id = ${input.actorUserId}`);
  if (input.deviceId !== undefined) updates.push(sql`device_id = ${input.deviceId}`);
  if (input.tvId !== undefined) updates.push(sql`tv_id = ${input.tvId}`);

  // sql.join une os trechos usando virgula, mantendo os valores parametrizados
  // pelo Drizzle. Isso evita concatenar strings manualmente e reduz risco de SQL injection.
  return sql`
    UPDATE logs
    SET ${sql.join(updates, sql`, `)}
    WHERE id = ${id}
  `;
};
