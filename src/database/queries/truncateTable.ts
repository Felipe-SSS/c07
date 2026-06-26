import { sql } from 'drizzle-orm';

export const ALLOWED_TRUNCATE_TABLES = [
  'users',
  'locations',
  'tvs',
  'devices',
  'commands',
  'logs',
  'firmware_versions',
] as const;

export type AllowedTruncateTable = (typeof ALLOWED_TRUNCATE_TABLES)[number];

export const truncateTable = (tableName: AllowedTruncateTable) => {
  return sql`
    TRUNCATE TABLE IF EXISTS ${sql.raw(tableName)}
  `;
};
