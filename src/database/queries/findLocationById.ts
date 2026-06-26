import { sql } from 'drizzle-orm';

export const findLocationById = (id: number) => sql`
  SELECT id, name, description, address, created_at AS createdAt, updated_at AS updatedAt
  FROM locations
  WHERE id = ${id}
  LIMIT 1
`;
