import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TruncateTableDto } from './dto/truncate-table.dto';
import { TableMaintenanceService } from './table-maintenance.service';

@Controller('database')
@ApiTags('database')
export class DatabaseController {
  constructor(private readonly tableMaintenanceService: TableMaintenanceService) {}

  @Post('truncate')
  @ApiOperation({ summary: 'Limpar uma tabela permitida com TRUNCATE' })
  truncate(@Body() body: TruncateTableDto) {
    return this.tableMaintenanceService.truncate(body.tableName);
  }
}
