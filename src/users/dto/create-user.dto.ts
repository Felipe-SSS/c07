import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Felipe Soares' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'felipe@iotv.local' })
  @IsString()
  email: string;

  @ApiProperty({ example: '$2b$10$hash-de-exemplo' })
  @IsString()
  passwordHash: string;

  @ApiPropertyOptional({ enum: ['viewer', 'admin'], example: 'admin' })
  @IsOptional()
  @IsIn(['viewer', 'admin'])
  role?: 'viewer' | 'admin';

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
