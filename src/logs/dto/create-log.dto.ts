import { JsonValue } from '../../database/queries/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogDto {
  @ApiProperty({ example: 'manual_test' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'audit' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Log criado manualmente para teste' })
  @IsString()
  message: string;

  @ApiPropertyOptional({
    example: {
      origin: 'swagger',
      severity: 'info',
    },
  })
  @IsOptional()
  metadata?: JsonValue;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  actorUserId?: number | null;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  deviceId?: number | null;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  tvId?: number | null;
}
