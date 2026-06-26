import { sql } from 'drizzle-orm';

export type CreateUserInput = {
  fullName: string;
  email: string;
  passwordHash: string;
  role?: 'viewer' | 'admin';
  isActive?: boolean;
};

export const createUser = (input: CreateUserInput) => sql`
  INSERT INTO users (full_name, email, password_hash, role, is_active)
  VALUES (
    ${input.fullName}, ${input.email}, ${input.passwordHash},
    ${input.role ?? 'viewer'}, ${input.isActive ?? true}
  )
`;
