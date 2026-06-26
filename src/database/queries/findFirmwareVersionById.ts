import { sql } from 'drizzle-orm';

export const findFirmwareVersionById = (id: number) => sql`
  SELECT id, code, version, changelog, release_date AS releaseDate,
    created_at AS createdAt, updated_at AS updatedAt
  FROM firmware_versions
  WHERE id = ${id}
  LIMIT 1
`;
