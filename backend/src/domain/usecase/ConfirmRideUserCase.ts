import { Ride, RideParams } from '@domain/entities/Ride';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { ConfirmRideParams } from '@domain/services/RideService';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';

@injectable()
export class ConfirmRideUseCase {
  constructor(
    @inject(TYPES.RideRepository)
    private readonly rideRepository: IRideRepository,
    @inject(TYPES.CustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @inject(TYPES.DriverRepository)
    private readonly driverRepository: IDriverRepository,
  ) {}

  async execute({ customerId, rideDetails }: ConfirmRideParams): Promise<Ride> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    if (
      !rideDetails.origin ||
      !rideDetails.destination ||
      rideDetails.origin === rideDetails.destination
    ) {
      throw new Error('Invalid origin or destination');
    }

    const driver = await this.driverRepository.findById(rideDetails.driver.id);
    if (!driver) {
      throw new Error('Driver not found');
    }

    if (!driver.isEligibleForDistance(rideDetails.distance)) {
      throw new Error('Invalid distance for this driver');
    }

    const newRide: RideParams = {
      id: rideDetails.id,
      customerId,
      origin: rideDetails.origin,
      destination: rideDetails.destination,
      distance: rideDetails.distance,
      duration: rideDetails.duration,
      driver: driver,
      value: rideDetails.value,
      date: rideDetails.date,
    };

    const ride = new Ride(newRide);

    await this.rideRepository.create(ride);

    return ride;
  }
}
