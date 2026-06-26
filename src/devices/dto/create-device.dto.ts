import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ example: '02:42:AC:11:99:01' })
  @IsString()
  macAddress: string;

  @ApiProperty({ example: '1.0.0' })
  @IsString()
  firmwareVersion: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  firmwareVersionId?: number | null;

  @ApiProperty({ example: 'iotv/test/devices/001' })
  @IsString()
  mqttTopic: string;

  @ApiPropertyOptional({ enum: ['online', 'offline'], example: 'online' })
  @IsOptional()
  @IsIn(['online', 'offline'])
  connectivityStatus?: 'online' | 'offline';

  @ApiProperty({ example: 1 })
  @IsNumber()
  tvId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  locationId: number;
}
