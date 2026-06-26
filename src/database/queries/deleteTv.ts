import { sql } from 'drizzle-orm';

export const deleteTv = (id: number) => sql`
  DELETE FROM tvs
  WHERE id = ${id}
`;
