import { sql } from 'drizzle-orm';

export const deleteUser = (id: number) => sql`
  DELETE FROM users
  WHERE id = ${id}
`;
