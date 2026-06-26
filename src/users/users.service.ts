import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { assertNotEmptyUpdate } from '../common/not-empty-update';
import { createUser } from '../database/queries/createUser';
import { deleteUser } from '../database/queries/deleteUser';
import { findUserById } from '../database/queries/findUserById';
import { findUsers } from '../database/queries/findUsers';
import { findUsersByIsActive } from '../database/queries/findUsersByIsActive';
import { InsertResult, MutationResult } from '../database/queries/types';
import { updateUser } from '../database/queries/updateUser';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateUserDto) {
    const result = await this.databaseService.executeMutation<InsertResult>(createUser(input));
    return this.findOne(result.insertId);
  }

  findAll() {
    return this.databaseService.execute(findUsers());
  }

  findByIsActive(isActiveParam: string) {
    if (isActiveParam !== 'true' && isActiveParam !== 'false') {
      throw new BadRequestException('O filtro isActive deve ser true ou false.');
    }

    return this.databaseService.execute(findUsersByIsActive(isActiveParam === 'true'));
  }

  async findOne(id: number) {
    const [user] = await this.databaseService.execute(findUserById(id));
    if (!user) throw new NotFoundException('Usuario nao encontrado.');
    return user;
  }

  async update(id: number, input: UpdateUserDto) {
    assertNotEmptyUpdate(input);
    const result = await this.databaseService.executeMutation<MutationResult>(updateUser(id, input));
    if (result.affectedRows === 0) throw new NotFoundException('Usuario nao encontrado.');
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.databaseService.executeMutation<MutationResult>(deleteUser(id));
    if (result.affectedRows === 0) throw new NotFoundException('Usuario nao encontrado.');
    return { deleted: true };
  }
}
