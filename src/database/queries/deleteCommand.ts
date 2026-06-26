import { sql } from 'drizzle-orm';

export const deleteCommand = (id: number) => sql`
  DELETE FROM commands
  WHERE id = ${id}
`;
