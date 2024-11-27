import { LocationMapper } from './../mappers/LocationMapper';
import { DriverMapper } from '@data/mappers/DriverMapper';
import { RideORM } from '@data/datasources/entities/Ride';
import { RideMapper } from '@data/mappers/RideMapper';
import { Ride } from '@domain/entities/Ride';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { LocationORM } from '@data/datasources/entities/Location';
import { CustomerORM } from '@data/datasources/entities/Customer';
import { DriverORM } from '@data/datasources/entities/Driver';

@injectable()
export class RideRepository implements IRideRepository {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) {}

  private get rideRepository(): Repository<RideORM> {
    return this.dataSource.getRepository(RideORM);
  }

  private get locationRepository(): Repository<LocationORM> {
    return this.dataSource.getRepository(LocationORM);
  }

  private get customerRepository(): Repository<CustomerORM> {
    return this.dataSource.getRepository(CustomerORM);
  }

  private get driverRepository(): Repository<DriverORM> {
    return this.dataSource.getRepository(DriverORM);
  }

  async findByCustomerId(customerId: string): Promise<Ride[]> {
    const rides = await this.rideRepository.find({
      where: { customer: { id: customerId } },
      relations: ['driver', 'origin', 'destination'],
    });
    return rides.map(
      (rideORM) =>
        new Ride({
          id: rideORM.id,
          customerId: rideORM.customer.id,
          driver: DriverMapper.toDomain(rideORM.driver),
          origin: LocationMapper.toDomain(rideORM.origin),
          destination: LocationMapper.toDomain(rideORM.destination),
          distance: rideORM.distance,
          duration: rideORM.duration,
          value: rideORM.value,
          date: rideORM.createdAt,
        }),
    );
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

  async save(ride: Ride): Promise<Ride> {
    const customer = await this.customerRepository.findOne({
      where: { id: ride.customerId },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const driver = await this.driverRepository.findOne({
      where: { id: ride.driver.id },
    });

    if (!driver) {
      throw new Error(`Driver not found`);
    }

    const origin = await this.locationRepository.save({
      id: ride.origin.id,
      address: ride.origin.address,
      latitude: ride.origin.latitude,
      longitude: ride.origin.longitude,
    });

    const destination = await this.locationRepository.save({
      id: ride.destination.id,
      address: ride.destination.address,
      latitude: ride.destination.latitude,
      longitude: ride.destination.longitude,
    });

    const rideOrm = this.rideRepository.create({
      id: ride.id,
      customer,
      driver,
      origin,
      destination,
      distance: ride.distance,
      createdAt: ride.date,
      duration: ride.duration,
      value: ride.value,
    });

    const savedRide = await this.rideRepository.save(rideOrm);

    return new Ride({
      id: savedRide.id,
      customerId: savedRide.customer.id,
      date: savedRide.createdAt,
      origin: ride.origin,
      destination: ride.destination,
      duration: ride.duration,
      value: ride.value,
      driver: ride.driver,
      distance: ride.distance,
    });
  }
}
