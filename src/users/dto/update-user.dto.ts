import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements Partial<CreateUserDto> {
  @ApiPropertyOptional({ example: 'Felipe Soares Atualizado' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'felipe.atualizado@iotv.local' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '$2b$10$novo-hash-de-exemplo' })
  @IsOptional()
  @IsString()
  passwordHash?: string;

  @ApiPropertyOptional({ enum: ['viewer', 'admin'], example: 'viewer' })
  @IsOptional()
  @IsIn(['viewer', 'admin'])
  role?: 'viewer' | 'admin';

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
