import { JsonValue } from '../../database/queries/types';
import { CreateLogDto } from './create-log.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLogDto implements Partial<CreateLogDto> {
  @ApiPropertyOptional({ example: 'manual_test' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 'audit' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Mensagem do log atualizada' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    example: {
      origin: 'swagger',
      reviewed: true,
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
