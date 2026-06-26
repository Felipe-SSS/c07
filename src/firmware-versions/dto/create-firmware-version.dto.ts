import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateFirmwareVersionDto {
  @ApiProperty({ example: 'FW-TEST-001' })
  @IsString()
  code: string;

  @ApiProperty({ example: '1.0.0' })
  @IsString()
  version: string;

  @ApiPropertyOptional({ example: 'Versao inicial de teste.' })
  @IsOptional()
  @IsString()
  changelog?: string | null;

  @ApiPropertyOptional({ example: '2026-06-26T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  releaseDate?: string | null;
}
