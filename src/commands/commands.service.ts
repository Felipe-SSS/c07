import { Injectable, NotFoundException } from '@nestjs/common';
import { assertNotEmptyUpdate } from '../common/not-empty-update';
import { createCommand } from '../database/queries/createCommand';
import { deleteCommand } from '../database/queries/deleteCommand';
import { findCommandById } from '../database/queries/findCommandById';
import { findCommands } from '../database/queries/findCommands';
import { InsertResult, MutationResult } from '../database/queries/types';
import { updateCommand } from '../database/queries/updateCommand';
import { DatabaseService } from '../database/database.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

@Injectable()
export class CommandsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateCommandDto) {
    const result = await this.databaseService.executeMutation<InsertResult>(createCommand(input));
    return this.findOne(result.insertId);
  }

  findAll() {
    return this.databaseService.execute(findCommands());
  }

  async findOne(id: number) {
    const [command] = await this.databaseService.execute(findCommandById(id));
    if (!command) throw new NotFoundException('Comando nao encontrado.');
    return command;
  }

  async update(id: number, input: UpdateCommandDto) {
    assertNotEmptyUpdate(input);
    const result = await this.databaseService.executeMutation<MutationResult>(updateCommand(id, input));
    if (result.affectedRows === 0) throw new NotFoundException('Comando nao encontrado.');
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.databaseService.executeMutation<MutationResult>(deleteCommand(id));
    if (result.affectedRows === 0) throw new NotFoundException('Comando nao encontrado.');
    return { deleted: true };
  }
}
