import { Ride } from '@domain/entities/Ride';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { IRideRepository } from '@domain/interfaces/IRideRepository';

export class RideService {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly driverRepository: IDriverRepository,
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async confirmRide(customerId: string, rideDetails: Ride): Promise<Ride> {
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

    const ride = new Ride({
      customerId,
      origin: rideDetails.origin,
      destination: rideDetails.destination,
      distance: rideDetails.distance,
      duration: rideDetails.duration,
      driver: driver,
      value: rideDetails.value,
      date: new Date(),
    });

    await this.rideRepository.create(ride);

    return ride;
  }
}
