import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DevicesService } from './devices.service';

@Controller('devices')
@ApiTags('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar device' })
  create(@Body() body: CreateDeviceDto) {
    return this.devicesService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar devices' })
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar device por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar device' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDeviceDto) {
    return this.devicesService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover device' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.remove(id);
  }
}
