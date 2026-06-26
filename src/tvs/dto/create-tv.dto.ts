import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTvDto {
  @ApiProperty({ example: 'Samsung' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'IoTV-55P' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'TVSN-TEST-001' })
  @IsString()
  serialNumber: string;

  @ApiPropertyOptional({ enum: ['on', 'off', 'offline'], example: 'offline' })
  @IsOptional()
  @IsIn(['on', 'off', 'offline'])
  status?: 'on' | 'off' | 'offline';

  @ApiProperty({ example: 1 })
  @IsNumber()
  locationId: number;
}
