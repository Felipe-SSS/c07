import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TvsController } from './tvs.controller';
import { TvsService } from './tvs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TvsController],
  providers: [TvsService],
})
export class TvsModule {}
