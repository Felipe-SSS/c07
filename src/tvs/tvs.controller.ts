import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { TvsService } from './tvs.service';

@Controller('tvs')
@ApiTags('tvs')
export class TvsController {
  constructor(private readonly tvsService: TvsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar TV' })
  create(@Body() body: CreateTvDto) {
    return this.tvsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar TVs' })
  findAll() {
    return this.tvsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar TV por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tvsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar TV' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTvDto) {
    return this.tvsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover TV' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tvsService.remove(id);
  }
}
