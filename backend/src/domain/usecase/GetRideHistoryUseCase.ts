import { Driver } from '@domain/entities/Driver';
import { Ride } from '@domain/entities/Ride';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { TYPES } from '@shared/di/Types';
import { inject } from 'inversify';

export class GetRideHistoryUseCase {
  constructor(
    @inject(TYPES.CustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @inject(TYPES.DriverRepository)
    private readonly driverRepository: IDriverRepository,
  ) { }

  async execute(customerId: string, driverId?: number): Promise<Ride[]> {
    const customer = await this.customerRepository.findById(customerId);

    let driver: Driver | null = null;


    if (driverId !== undefined) {

      driver = await this.driverRepository.findById(driverId);

      if (!driver) {
        throw new Error('Driver not found');
      }
    }

    const rides: Ride[] = customer?.rideHistory ?? [];

    if (rides.length === 0) {
      throw new Error('No rides found');
    }

    if (driverId) {
      const filteredRides = rides.filter((ride) => ride.driver.id === driverId);

      if (filteredRides.length === 0) {
        throw new Error('No rides found for this driver');
      }

      return filteredRides;
    }

    rides.sort((a, b) => b.date.getTime() - a.date.getTime());

    return rides;
  }
}
