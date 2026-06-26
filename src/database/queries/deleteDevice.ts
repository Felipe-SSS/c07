import { sql } from 'drizzle-orm';

export const deleteDevice = (id: number) => sql`
  DELETE FROM devices
  WHERE id = ${id}
`;
