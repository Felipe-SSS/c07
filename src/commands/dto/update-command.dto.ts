import { JsonValue } from '../../database/queries/types';
import { CreateCommandDto } from './create-command.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNumber, IsOptional } from 'class-validator';

export class UpdateCommandDto implements Partial<CreateCommandDto> {
  @ApiPropertyOptional({ enum: ['turn_on', 'turn_off', 'restart', 'update_firmware'], example: 'restart' })
  @IsOptional()
  @IsIn(['turn_on', 'turn_off', 'restart', 'update_firmware'])
  type?: 'turn_on' | 'turn_off' | 'restart' | 'update_firmware';

  @ApiPropertyOptional({
    example: {
      source: 'manual-test',
      reason: 'reconnect',
    },
  })
  @IsOptional()
  payload?: JsonValue;

  @ApiPropertyOptional({ enum: ['pending', 'sent', 'acknowledged', 'failed'], example: 'acknowledged' })
  @IsOptional()
  @IsIn(['pending', 'sent', 'acknowledged', 'failed'])
  status?: 'pending' | 'sent' | 'acknowledged' | 'failed';

  @ApiPropertyOptional({ example: '2026-06-26T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  sentAt?: string | null;

  @ApiPropertyOptional({ example: '2026-06-26T10:01:00Z' })
  @IsOptional()
  @IsDateString()
  respondedAt?: string | null;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  createdByUserId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  deviceId?: number;
}
