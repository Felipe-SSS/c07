import { Injectable } from '@nestjs/common';
import { truncateTable } from './queries/truncateTable';
import { DatabaseService } from './database.service';

@Injectable()
export class TableMaintenanceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async truncate(tableName: Parameters<typeof truncateTable>[0]) {
    await this.databaseService.executeMutation(truncateTable(tableName));
    return { truncated: true, tableName };
  }
}
