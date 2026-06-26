import { SQL, sql } from 'drizzle-orm';
import { CreateTvInput } from './createTv';

export type UpdateTvInput = Partial<CreateTvInput>;

export const updateTv = (id: number, input: UpdateTvInput) => {
  // Cada campo opcional recebido no PATCH vira um trecho SQL independente.
  // Exemplo: { status: 'on', locationId: 2 } gera:
  // UPDATE tvs SET status = ?, location_id = ? WHERE id = ?
  const updates: SQL[] = [];
  if (input.brand !== undefined) updates.push(sql`brand = ${input.brand}`);
  if (input.model !== undefined) updates.push(sql`model = ${input.model}`);
  if (input.serialNumber !== undefined) updates.push(sql`serial_number = ${input.serialNumber}`);
  if (input.status !== undefined) updates.push(sql`status = ${input.status}`);
  if (input.locationId !== undefined) updates.push(sql`location_id = ${input.locationId}`);

  // sql.join une os trechos usando virgula, mantendo os valores parametrizados
  // pelo Drizzle. Isso evita concatenar strings manualmente e reduz risco de SQL injection.
  return sql`
    UPDATE tvs
    SET ${sql.join(updates, sql`, `)}
    WHERE id = ${id}
  `;
};
