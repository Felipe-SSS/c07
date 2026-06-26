import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateLogDto } from './dto/create-log.dto';
import { LogPaginationInput } from './log-pagination';
import { UpdateLogDto } from './dto/update-log.dto';
import { LogsService } from './logs.service';

@Controller('logs')
@ApiTags('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar log' })
  create(@Body() body: CreateLogDto) {
    return this.logsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar logs paginados do mais recente ao mais antigo' })
  @ApiQuery({ name: 'limit', required: false, example: 50, description: 'Maximo 50' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  findAll(@Query() query: LogPaginationInput) {
    return this.logsService.findAll(query);
  }

  @Get('by-user/:userId')
  @ApiOperation({ summary: 'Buscar logs por usuario' })
  @ApiQuery({ name: 'limit', required: false, example: 50, description: 'Maximo 50' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  findByUserId(@Param('userId', ParseIntPipe) userId: number, @Query() query: LogPaginationInput) {
    return this.logsService.findByUserId(userId, query);
  }

  @Get('by-tv/:tvId')
  @ApiOperation({ summary: 'Buscar logs por TV' })
  @ApiQuery({ name: 'limit', required: false, example: 50, description: 'Maximo 50' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  findByTvId(@Param('tvId', ParseIntPipe) tvId: number, @Query() query: LogPaginationInput) {
    return this.logsService.findByTvId(tvId, query);
  }

  @Get('by-device/:deviceId')
  @ApiOperation({ summary: 'Buscar logs por device' })
  @ApiQuery({ name: 'limit', required: false, example: 50, description: 'Maximo 50' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  findByDeviceId(@Param('deviceId', ParseIntPipe) deviceId: number, @Query() query: LogPaginationInput) {
    return this.logsService.findByDeviceId(deviceId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar log por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.logsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar log' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateLogDto) {
    return this.logsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover log' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.logsService.remove(id);
  }
}
