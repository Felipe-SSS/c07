import { sql } from 'drizzle-orm';

export const deleteFirmwareVersion = (id: number) => sql`
  DELETE FROM firmware_versions
  WHERE id = ${id}
`;
