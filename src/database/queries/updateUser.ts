import { SQL, sql } from 'drizzle-orm';
import { CreateUserInput } from './createUser';

export type UpdateUserInput = Partial<CreateUserInput>;

export const updateUser = (id: number, input: UpdateUserInput) => {
  // Cada campo opcional recebido no PATCH vira um trecho SQL independente.
  // Exemplo: { fullName: 'Felipe', role: 'admin' } gera:
  // UPDATE users SET full_name = ?, role = ? WHERE id = ?
  const updates: SQL[] = [];
  if (input.fullName !== undefined) updates.push(sql`full_name = ${input.fullName}`);
  if (input.email !== undefined) updates.push(sql`email = ${input.email}`);
  if (input.passwordHash !== undefined) updates.push(sql`password_hash = ${input.passwordHash}`);
  if (input.role !== undefined) updates.push(sql`role = ${input.role}`);
  if (input.isActive !== undefined) updates.push(sql`is_active = ${input.isActive}`);

  // sql.join une os trechos usando virgula, mantendo os valores parametrizados
  // pelo Drizzle. Isso evita concatenar strings manualmente e reduz risco de SQL injection.
  return sql`
    UPDATE users
    SET ${sql.join(updates, sql`, `)}
    WHERE id = ${id}
  `;
};
