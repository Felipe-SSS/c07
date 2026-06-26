import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuario' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      admin: {
        summary: 'Usuario administrador ativo',
        value: {
          fullName: 'Felipe Soares',
          email: 'felipe@iotv.local',
          passwordHash: '$2b$10$hash-de-exemplo',
          role: 'admin',
          isActive: true,
        },
      },
    },
  })
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuarios, opcionalmente filtrando por ativo/inativo' })
  @ApiQuery({ name: 'isActive', required: false, enum: ['true', 'false'] })
  findAll(@Query('isActive') isActive?: string) {
    if (isActive !== undefined) {
      return this.usersService.findByIsActive(isActive);
    }

    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuario por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuario' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuario' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
