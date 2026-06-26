import { Injectable, NotFoundException } from '@nestjs/common';
import { assertNotEmptyUpdate } from '../common/not-empty-update';
import { createFirmwareVersion } from '../database/queries/createFirmwareVersion';
import { deleteFirmwareVersion } from '../database/queries/deleteFirmwareVersion';
import { findFirmwareVersionById } from '../database/queries/findFirmwareVersionById';
import { findFirmwareVersions } from '../database/queries/findFirmwareVersions';
import { InsertResult, MutationResult } from '../database/queries/types';
import { updateFirmwareVersion } from '../database/queries/updateFirmwareVersion';
import { DatabaseService } from '../database/database.service';
import { CreateFirmwareVersionDto } from './dto/create-firmware-version.dto';
import { UpdateFirmwareVersionDto } from './dto/update-firmware-version.dto';

@Injectable()
export class FirmwareVersionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateFirmwareVersionDto) {
    const result = await this.databaseService.executeMutation<InsertResult>(createFirmwareVersion(input));
    return this.findOne(result.insertId);
  }

  findAll() {
    return this.databaseService.execute(findFirmwareVersions());
  }

  async findOne(id: number) {
    const [firmwareVersion] = await this.databaseService.execute(findFirmwareVersionById(id));
    if (!firmwareVersion) throw new NotFoundException('Versao de firmware nao encontrada.');
    return firmwareVersion;
  }

  async update(id: number, input: UpdateFirmwareVersionDto) {
    assertNotEmptyUpdate(input);
    const result = await this.databaseService.executeMutation<MutationResult>(updateFirmwareVersion(id, input));
    if (result.affectedRows === 0) throw new NotFoundException('Versao de firmware nao encontrada.');
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.databaseService.executeMutation<MutationResult>(deleteFirmwareVersion(id));
    if (result.affectedRows === 0) throw new NotFoundException('Versao de firmware nao encontrada.');
    return { deleted: true };
  }
}
