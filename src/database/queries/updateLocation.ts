import { SQL, sql } from 'drizzle-orm';
import { CreateLocationInput } from './createLocation';

export type UpdateLocationInput = Partial<CreateLocationInput>;

export const updateLocation = (id: number, input: UpdateLocationInput) => {
  // Cada campo opcional recebido no PATCH vira um trecho SQL independente.
  // Exemplo: { name: 'Sala 101', address: 'Bloco A' } gera:
  // UPDATE locations SET name = ?, address = ? WHERE id = ?
  const updates: SQL[] = [];
  if (input.name !== undefined) updates.push(sql`name = ${input.name}`);
  if (input.description !== undefined) updates.push(sql`description = ${input.description}`);
  if (input.address !== undefined) updates.push(sql`address = ${input.address}`);

  // sql.join une os trechos usando virgula, mantendo os valores parametrizados
  // pelo Drizzle. Isso evita concatenar strings manualmente e reduz risco de SQL injection.
  return sql`
    UPDATE locations
    SET ${sql.join(updates, sql`, `)}
    WHERE id = ${id}
  `;
};
