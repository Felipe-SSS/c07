import { CreateLocationDto } from './create-location.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto implements Partial<CreateLocationDto> {
  @ApiPropertyOptional({ example: 'Recepcao Atualizada' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Descricao atualizada do local.' })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ example: 'Bloco A - Sala 101' })
  @IsOptional()
  @IsString()
  address?: string | null;
}
