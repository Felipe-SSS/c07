import { sql } from 'drizzle-orm';

export type CreateTvInput = {
  brand: string;
  model: string;
  serialNumber: string;
  status?: 'on' | 'off' | 'offline';
  locationId: number;
};

export const createTv = (input: CreateTvInput) => sql`
  INSERT INTO tvs (brand, model, serial_number, status, location_id)
  VALUES (${input.brand}, ${input.model}, ${input.serialNumber}, ${input.status ?? 'offline'}, ${input.locationId})
`;
