import { sql } from 'drizzle-orm';

export const findFirmwareVersions = () => sql`
  SELECT id, code, version, changelog, release_date AS releaseDate,
    created_at AS createdAt, updated_at AS updatedAt
  FROM firmware_versions
  ORDER BY id
`;
