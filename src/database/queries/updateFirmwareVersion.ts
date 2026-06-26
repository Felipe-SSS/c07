import { SQL, sql } from 'drizzle-orm';
import { CreateFirmwareVersionInput } from './createFirmwareVersion';

export type UpdateFirmwareVersionInput = Partial<CreateFirmwareVersionInput>;

export const updateFirmwareVersion = (id: number, input: UpdateFirmwareVersionInput) => {
  // Cada campo opcional recebido no PATCH vira um trecho SQL independente.
  // Exemplo: { version: '1.2.0', changelog: 'Correcoes de estabilidade' } gera:
  // UPDATE firmware_versions SET version = ?, changelog = ? WHERE id = ?
  const updates: SQL[] = [];
  if (input.code !== undefined) updates.push(sql`code = ${input.code}`);
  if (input.version !== undefined) updates.push(sql`version = ${input.version}`);
  if (input.changelog !== undefined) updates.push(sql`changelog = ${input.changelog}`);
  if (input.releaseDate !== undefined) updates.push(sql`release_date = ${input.releaseDate}`);

  // sql.join une os trechos usando virgula, mantendo os valores parametrizados
  // pelo Drizzle. Isso evita concatenar strings manualmente e reduz risco de SQL injection.
  return sql`
    UPDATE firmware_versions
    SET ${sql.join(updates, sql`, `)}
    WHERE id = ${id}
  `;
};
