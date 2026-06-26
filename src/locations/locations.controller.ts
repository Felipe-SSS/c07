import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
@ApiTags('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar local' })
  create(@Body() body: CreateLocationDto) {
    return this.locationsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar locais' })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar local por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar local' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateLocationDto) {
    return this.locationsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover local' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.remove(id);
  }
}
