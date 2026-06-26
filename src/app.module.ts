import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandsModule } from './commands/commands.module';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './devices/devices.module';
import { FirmwareVersionsModule } from './firmware-versions/firmware-versions.module';
import { LocationsModule } from './locations/locations.module';
import { LogsModule } from './logs/logs.module';
import { TvsModule } from './tvs/tvs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    LocationsModule,
    TvsModule,
    DevicesModule,
    CommandsModule,
    LogsModule,
    FirmwareVersionsModule,
  ],
})
export class AppModule {}
