import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFirmwareVersionDto } from './dto/create-firmware-version.dto';
import { UpdateFirmwareVersionDto } from './dto/update-firmware-version.dto';
import { FirmwareVersionsService } from './firmware-versions.service';

@Controller('firmware-versions')
@ApiTags('firmware-versions')
export class FirmwareVersionsController {
  constructor(private readonly firmwareVersionsService: FirmwareVersionsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar versao de firmware' })
  create(@Body() body: CreateFirmwareVersionDto) {
    return this.firmwareVersionsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar versoes de firmware' })
  findAll() {
    return this.firmwareVersionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar versao de firmware por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.firmwareVersionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar versao de firmware' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateFirmwareVersionDto) {
    return this.firmwareVersionsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover versao de firmware' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.firmwareVersionsService.remove(id);
  }
}
