import { CreateFirmwareVersionDto } from './create-firmware-version.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateFirmwareVersionDto implements Partial<CreateFirmwareVersionDto> {
  @ApiPropertyOptional({ example: 'FW-TEST-002' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ example: '1.1.0' })
  @IsOptional()
  @IsString()
  version?: string;

  @ApiPropertyOptional({ example: 'Correcoes de estabilidade.' })
  @IsOptional()
  @IsString()
  changelog?: string | null;

  @ApiPropertyOptional({ example: '2026-06-26T12:00:00Z' })
  @IsOptional()
  @IsDateString()
  releaseDate?: string | null;
}
