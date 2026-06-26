import { sql } from 'drizzle-orm';

export const findTvById = (id: number) => sql`
  SELECT id, brand, model, serial_number AS serialNumber, status, location_id AS locationId,
    created_at AS createdAt, updated_at AS updatedAt
  FROM tvs
  WHERE id = ${id}
  LIMIT 1
`;
