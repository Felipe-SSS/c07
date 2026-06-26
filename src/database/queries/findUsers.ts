import { sql } from 'drizzle-orm';

export const findUsers = () => sql`
  SELECT id, full_name AS fullName, email, role, is_active AS isActive,
    created_at AS createdAt, updated_at AS updatedAt
  FROM users
  ORDER BY id
`;
