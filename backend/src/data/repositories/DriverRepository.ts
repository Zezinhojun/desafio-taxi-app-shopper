import { inject, injectable } from 'inversify';
import { DriverORM } from '@data/datasources/entities/Driver';
import { Repository, DataSource } from 'typeorm';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { Driver } from '@domain/entities/Driver';
import { DriverMapper } from '@data/mappers/DriverMapper';
import { TYPES } from '@shared/di/Types';

@injectable()
export class DriverRepository implements IDriverRepository {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) {}

  private get driverRepository(): Repository<DriverORM> {
    return this.dataSource.getRepository(DriverORM);
  }

  async findById(driverId: number): Promise<Driver | null> {
    try {
      const driverOrm = await this.driverRepository.findOne({
        where: { id: driverId },
        relations: ['vehicle'],
      });

      if (!driverOrm) {
        return null;
      }

      const DriverMapperReturn = DriverMapper.toDomain(driverOrm);

      return DriverMapperReturn;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Erro ao buscar o driver pelo ID ${driverId}: ${error?.message}`,
        );
      }
      throw error;
    }
  }

  async findEligibleDrivers(distance: number): Promise<Driver[]> {
    const driversOrm = await this.driverRepository.find({
      where: { minimumDistance: distance },
      relations: ['vehicle', 'reviews'],
    });
    return driversOrm.map(DriverMapper.toDomain);
  }
}
