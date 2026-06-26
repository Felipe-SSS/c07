import { BadRequestException } from '@nestjs/common';

export const assertNotEmptyUpdate = (input: object) => {
  if (Object.keys(input).length === 0) {
    throw new BadRequestException('Informe ao menos um campo para atualizar.');
  }
};
