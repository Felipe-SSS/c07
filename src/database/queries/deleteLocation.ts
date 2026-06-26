import { sql } from 'drizzle-orm';

export const deleteLocation = (id: number) => sql`
  DELETE FROM locations
  WHERE id = ${id}
`;
