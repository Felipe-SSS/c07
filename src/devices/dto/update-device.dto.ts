import { CreateDeviceDto } from './create-device.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDeviceDto implements Partial<CreateDeviceDto> {
  @ApiPropertyOptional({ example: '02:42:AC:11:99:02' })
  @IsOptional()
  @IsString()
  macAddress?: string;

  @ApiPropertyOptional({ example: '1.2.0' })
  @IsOptional()
  @IsString()
  firmwareVersion?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  firmwareVersionId?: number | null;

  @ApiPropertyOptional({ example: 'iotv/test/devices/002' })
  @IsOptional()
  @IsString()
  mqttTopic?: string;

  @ApiPropertyOptional({ enum: ['online', 'offline'], example: 'offline' })
  @IsOptional()
  @IsIn(['online', 'offline'])
  connectivityStatus?: 'online' | 'offline';

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  tvId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  locationId?: number;
}
