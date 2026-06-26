import { sql } from 'drizzle-orm';

export const findUserById = (id: number) => sql`
  SELECT id, full_name AS fullName, email, role, is_active AS isActive,
    created_at AS createdAt, updated_at AS updatedAt
  FROM users
  WHERE id = ${id}
  LIMIT 1
`;
