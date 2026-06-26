import { sql } from 'drizzle-orm';

export const deleteLog = (id: number) => sql`
  DELETE FROM logs
  WHERE id = ${id}
`;
