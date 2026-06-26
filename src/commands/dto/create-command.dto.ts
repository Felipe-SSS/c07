import { JsonValue } from '../../database/queries/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNumber, IsOptional } from 'class-validator';

export class CreateCommandDto {
  @ApiProperty({ enum: ['turn_on', 'turn_off', 'restart', 'update_firmware'], example: 'turn_on' })
  @IsIn(['turn_on', 'turn_off', 'restart', 'update_firmware'])
  type: 'turn_on' | 'turn_off' | 'restart' | 'update_firmware';

  @ApiPropertyOptional({
    example: {
      source: 'manual-test',
      expectedState: 'on',
    },
  })
  @IsOptional()
  payload?: JsonValue;

  @ApiPropertyOptional({ enum: ['pending', 'sent', 'acknowledged', 'failed'], example: 'pending' })
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

  @ApiProperty({ example: 1 })
  @IsNumber()
  createdByUserId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  deviceId: number;
}
