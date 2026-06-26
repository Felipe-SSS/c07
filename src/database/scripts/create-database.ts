import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';

const loadEnvFile = () => {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  const env = readFileSync(envPath, 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    process.env[key] ??= value;
  }
};

const assertValidDatabaseName = (databaseName: string) => {
  if (!/^[a-zA-Z0-9_]+$/.test(databaseName)) {
    throw new Error('DB_NAME deve conter apenas letras, numeros e underscore.');
  }
};

const run = async () => {
  loadEnvFile();

  const databaseName = process.env.DB_NAME ?? 'iotv';
  assertValidDatabaseName(databaseName);

  const pool = createPool({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    connectionLimit: 1,
  });

  const db = drizzle(pool);

  try {
    await db.execute(sql`
      CREATE DATABASE IF NOT EXISTS ${sql.raw(`\`${databaseName}\``)}
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci
    `);

    console.log(`Database '${databaseName}' pronto para uso.`);
  } finally {
    await pool.end();
  }
};

run().catch((error: unknown) => {
  console.error('Erro ao criar database:', error);
  process.exitCode = 1;
});
