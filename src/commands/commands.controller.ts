import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

@Controller('commands')
@ApiTags('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar comando' })
  create(@Body() body: CreateCommandDto) {
    return this.commandsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar comandos' })
  findAll() {
    return this.commandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar comando por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commandsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar comando' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCommandDto) {
    return this.commandsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover comando' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commandsService.remove(id);
  }
}
