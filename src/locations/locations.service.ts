import { Injectable, NotFoundException } from '@nestjs/common';
import { assertNotEmptyUpdate } from '../common/not-empty-update';
import { createLocation } from '../database/queries/createLocation';
import { deleteLocation } from '../database/queries/deleteLocation';
import { findLocationById } from '../database/queries/findLocationById';
import { findLocations } from '../database/queries/findLocations';
import { InsertResult, MutationResult } from '../database/queries/types';
import { updateLocation } from '../database/queries/updateLocation';
import { DatabaseService } from '../database/database.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateLocationDto) {
    const result = await this.databaseService.executeMutation<InsertResult>(createLocation(input));
    return this.findOne(result.insertId);
  }

  findAll() {
    return this.databaseService.execute(findLocations());
  }

  async findOne(id: number) {
    const [location] = await this.databaseService.execute(findLocationById(id));
    if (!location) throw new NotFoundException('Local nao encontrado.');
    return location;
  }

  async update(id: number, input: UpdateLocationDto) {
    assertNotEmptyUpdate(input);
    const result = await this.databaseService.executeMutation<MutationResult>(updateLocation(id, input));
    if (result.affectedRows === 0) throw new NotFoundException('Local nao encontrado.');
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.databaseService.executeMutation<MutationResult>(deleteLocation(id));
    if (result.affectedRows === 0) throw new NotFoundException('Local nao encontrado.');
    return { deleted: true };
  }
}
