import { RideORM } from '@data/datasources/entities/Ride';
import { RideMapper } from '@data/mappers/RideMapper';
import { Ride } from '@domain/entities/Ride';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

@injectable()
export class RideRepository implements IRideRepository {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) {}

  private get rideRepository(): Repository<RideORM> {
    return this.dataSource.getRepository(RideORM);
  }

  async create(ride: Ride): Promise<Ride> {
    const rideOrm = RideMapper.toOrm(ride);
    const savedRide = await this.rideRepository.save(rideOrm);
    return RideMapper.toDomain(savedRide);
  }

  async findByCustomerId(customerId: string): Promise<Ride[]> {
    const ridesOrm = await this.rideRepository.find({
      where: { customer: { id: customerId } },
      relations: [
        'customer',
        'driver',
        'driver.vehicle',
        'driver.reviews',
        'origin',
        'destination',
      ],
    });
    return ridesOrm ? ridesOrm.map(RideMapper.toDomain) : [];
  }
  async findByDriverId(driverId: number): Promise<Ride[]> {
    const ridesOrm = await this.rideRepository.find({
      where: { driver: { id: driverId } },
      relations: [
        'customer',
        'driver',
        'driver.vehicle',
        'driver.reviews',
        'origin',
        'destination',
      ],
    });
    return ridesOrm ? ridesOrm.map(RideMapper.toDomain) : [];
  }

  async findByCustomerAndDriver(
    customerId: string,
    driverId: number,
  ): Promise<Ride[]> {
    const ridesOrm = await this.rideRepository.find({
      where: {
        customer: { id: customerId },
        driver: { id: driverId },
      },
      relations: [
        'customer',
        'driver',
        'driver.vehicle',
        'driver.reviews',
        'origin',
        'destination',
      ],
    });
    return ridesOrm ? ridesOrm.map(RideMapper.toDomain) : [];
  }
}
