import { sql } from 'drizzle-orm';

export const findLocations = () => sql`
  SELECT id, name, description, address, created_at AS createdAt, updated_at AS updatedAt
  FROM locations
  ORDER BY id
`;
