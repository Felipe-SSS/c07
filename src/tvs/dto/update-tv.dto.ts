import { CreateTvDto } from './create-tv.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTvDto implements Partial<CreateTvDto> {
  @ApiPropertyOptional({ example: 'LG' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ example: 'IoTV-65P' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 'TVSN-TEST-002' })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiPropertyOptional({ enum: ['on', 'off', 'offline'], example: 'on' })
  @IsOptional()
  @IsIn(['on', 'off', 'offline'])
  status?: 'on' | 'off' | 'offline';

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  locationId?: number;
}
