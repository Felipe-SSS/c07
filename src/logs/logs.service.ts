import { Injectable, NotFoundException } from '@nestjs/common';
import { assertNotEmptyUpdate } from '../common/not-empty-update';
import { createLog } from '../database/queries/createLog';
import { deleteLog } from '../database/queries/deleteLog';
import { findLogById } from '../database/queries/findLogById';
import { findLogs } from '../database/queries/findLogs';
import { findLogsByDeviceId } from '../database/queries/findLogsByDeviceId';
import { findLogsByTvId } from '../database/queries/findLogsByTvId';
import { findLogsByUserId } from '../database/queries/findLogsByUserId';
import { InsertResult, MutationResult } from '../database/queries/types';
import { updateLog } from '../database/queries/updateLog';
import { DatabaseService } from '../database/database.service';
import { CreateLogDto } from './dto/create-log.dto';
import { LogPaginationInput, normalizeLogPagination } from './log-pagination';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateLogDto) {
    const result = await this.databaseService.executeMutation<InsertResult>(createLog(input));
    return this.findOne(result.insertId);
  }

  findAll(pagination?: LogPaginationInput) {
    const { limit, offset } = normalizeLogPagination(pagination);
    return this.databaseService.execute(findLogs(limit, offset));
  }

  findByUserId(userId: number, pagination?: LogPaginationInput) {
    const { limit, offset } = normalizeLogPagination(pagination);
    return this.databaseService.execute(findLogsByUserId(userId, limit, offset));
  }

  findByTvId(tvId: number, pagination?: LogPaginationInput) {
    const { limit, offset } = normalizeLogPagination(pagination);
    return this.databaseService.execute(findLogsByTvId(tvId, limit, offset));
  }

  findByDeviceId(deviceId: number, pagination?: LogPaginationInput) {
    const { limit, offset } = normalizeLogPagination(pagination);
    return this.databaseService.execute(findLogsByDeviceId(deviceId, limit, offset));
  }

  async findOne(id: number) {
    const [log] = await this.databaseService.execute(findLogById(id));
    if (!log) throw new NotFoundException('Log nao encontrado.');
    return log;
  }

  async update(id: number, input: UpdateLogDto) {
    assertNotEmptyUpdate(input);
    const result = await this.databaseService.executeMutation<MutationResult>(updateLog(id, input));
    if (result.affectedRows === 0) throw new NotFoundException('Log nao encontrado.');
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.databaseService.executeMutation<MutationResult>(deleteLog(id));
    if (result.affectedRows === 0) throw new NotFoundException('Log nao encontrado.');
    return { deleted: true };
  }
}
