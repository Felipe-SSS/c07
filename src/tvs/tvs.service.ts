import { Injectable, NotFoundException } from '@nestjs/common';
import { assertNotEmptyUpdate } from '../common/not-empty-update';
import { createTv } from '../database/queries/createTv';
import { deleteTv } from '../database/queries/deleteTv';
import { findTvById } from '../database/queries/findTvById';
import { findTvs } from '../database/queries/findTvs';
import { InsertResult, MutationResult } from '../database/queries/types';
import { updateTv } from '../database/queries/updateTv';
import { DatabaseService } from '../database/database.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';

@Injectable()
export class TvsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateTvDto) {
    const result = await this.databaseService.executeMutation<InsertResult>(createTv(input));
    return this.findOne(result.insertId);
  }

  findAll() {
    return this.databaseService.execute(findTvs());
  }

  async findOne(id: number) {
    const [tv] = await this.databaseService.execute(findTvById(id));
    if (!tv) throw new NotFoundException('TV nao encontrada.');
    return tv;
  }

  async update(id: number, input: UpdateTvDto) {
    assertNotEmptyUpdate(input);
    const result = await this.databaseService.executeMutation<MutationResult>(updateTv(id, input));
    if (result.affectedRows === 0) throw new NotFoundException('TV nao encontrada.');
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.databaseService.executeMutation<MutationResult>(deleteTv(id));
    if (result.affectedRows === 0) throw new NotFoundException('TV nao encontrada.');
    return { deleted: true };
  }
}
