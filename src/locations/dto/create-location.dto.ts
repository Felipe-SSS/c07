import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'Recepcao' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Entrada principal com TV de boas-vindas.' })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ example: 'Bloco A - Terreo' })
  @IsOptional()
  @IsString()
  address?: string | null;
}
