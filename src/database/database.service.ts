import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQL } from 'drizzle-orm';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;
  readonly db: MySql2Database;

  constructor(configService: ConfigService) {
    this.pool = createPool({
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 3306),
      user: configService.get<string>('DB_USER', 'root'),
      password: configService.get<string>('DB_PASSWORD', ''),
      database: configService.get<string>('DB_NAME', 'iotv'),
      connectionLimit: 10,
    });

    this.db = drizzle(this.pool);
  }

  async execute<T = unknown>(query: SQL): Promise<T[]> {
    const result = await this.db.execute(query);
    return Array.isArray(result) && Array.isArray(result[0])
      ? (result[0] as T[])
      : (result as unknown as T[]);
  }

  async executeMutation<T = unknown>(query: SQL): Promise<T> {
    const result = await this.db.execute(query);
    return Array.isArray(result) ? (result[0] as T) : (result as T);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
