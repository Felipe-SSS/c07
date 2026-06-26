import { Injectable, NotFoundException } from '@nestjs/common';
import { assertNotEmptyUpdate } from '../common/not-empty-update';
import { createDevice } from '../database/queries/createDevice';
import { deleteDevice } from '../database/queries/deleteDevice';
import { findDeviceById } from '../database/queries/findDeviceById';
import { findDevices } from '../database/queries/findDevices';
import { InsertResult, MutationResult } from '../database/queries/types';
import { updateDevice } from '../database/queries/updateDevice';
import { DatabaseService } from '../database/database.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateDeviceDto) {
    const result = await this.databaseService.executeMutation<InsertResult>(createDevice(input));
    return this.findOne(result.insertId);
  }

  findAll() {
    return this.databaseService.execute(findDevices());
  }

  async findOne(id: number) {
    const [device] = await this.databaseService.execute(findDeviceById(id));
    if (!device) throw new NotFoundException('Dispositivo nao encontrado.');
    return device;
  }

  async update(id: number, input: UpdateDeviceDto) {
    assertNotEmptyUpdate(input);
    const result = await this.databaseService.executeMutation<MutationResult>(updateDevice(id, input));
    if (result.affectedRows === 0) throw new NotFoundException('Dispositivo nao encontrado.');
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.databaseService.executeMutation<MutationResult>(deleteDevice(id));
    if (result.affectedRows === 0) throw new NotFoundException('Dispositivo nao encontrado.');
    return { deleted: true };
  }
}
