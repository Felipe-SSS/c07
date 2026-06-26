import { sql } from 'drizzle-orm';

export type CreateFirmwareVersionInput = {
  code: string;
  version: string;
  changelog?: string | null;
  releaseDate?: string | null;
};

export const createFirmwareVersion = (input: CreateFirmwareVersionInput) => sql`
  INSERT INTO firmware_versions (code, version, changelog, release_date)
  VALUES (${input.code}, ${input.version}, ${input.changelog ?? null}, ${input.releaseDate ?? null})
`;
