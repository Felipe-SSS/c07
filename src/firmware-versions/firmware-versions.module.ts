import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FirmwareVersionsController } from './firmware-versions.controller';
import { FirmwareVersionsService } from './firmware-versions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FirmwareVersionsController],
  providers: [FirmwareVersionsService],
})
export class FirmwareVersionsModule {}
