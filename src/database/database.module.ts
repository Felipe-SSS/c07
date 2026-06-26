import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { TableMaintenanceService } from './table-maintenance.service';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService, TableMaintenanceService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
