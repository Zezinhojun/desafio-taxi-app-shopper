import { InjectRepository } from 'inversify-typeorm';
import { injectable } from 'inversify';
import { DriverORM } from '@data/datasources/entities/Driver';
import { Repository } from 'typeorm';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { Driver } from '@domain/entities/Driver';
import { DriverMapper } from '@data/mappers/DriverMapper';

@injectable()
export class DriverRepository implements IDriverRepository {
  constructor(
    @InjectRepository(DriverORM)
    private readonly driverRepository: Repository<DriverORM>,
  ) {}

  async findById(id: number): Promise<Driver | null> {
    const driverOrm = await this.driverRepository.findOne({
      where: { id },
      relations: ['vehicle', 'review'],
    });
    return driverOrm ? DriverMapper.toDomain(driverOrm) : null;
  }

  async findEligibleDrivers(distance: number): Promise<Driver[]> {
    const driversOrm = await this.driverRepository.find({
      where: { minimumDistance: distance },
      relations: ['vehicle', 'review'],
    });
    return driversOrm.map(DriverMapper.toDomain);
  }
}
