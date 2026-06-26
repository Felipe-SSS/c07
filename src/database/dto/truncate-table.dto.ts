import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ALLOWED_TRUNCATE_TABLES, AllowedTruncateTable } from '../queries/truncateTable';

export class TruncateTableDto {
  @ApiProperty({ enum: ALLOWED_TRUNCATE_TABLES, example: 'logs' })
  @IsIn(ALLOWED_TRUNCATE_TABLES)
  tableName: AllowedTruncateTable;
}
