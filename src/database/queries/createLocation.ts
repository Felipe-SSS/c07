import { sql } from 'drizzle-orm';

export type CreateLocationInput = {
  name: string;
  description?: string | null;
  address?: string | null;
};

export const createLocation = (input: CreateLocationInput) => sql`
  INSERT INTO locations (name, description, address)
  VALUES (${input.name}, ${input.description ?? null}, ${input.address ?? null})
`;
