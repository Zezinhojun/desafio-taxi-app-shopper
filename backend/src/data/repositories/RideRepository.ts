import { Ride } from '@domain/entities/Ride';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { injectable } from 'inversify';

@injectable()
export class RideRepository implements IRideRepository {
  private readonly rides: Ride[] = [];

  async create(ride: Ride): Promise<Ride> {
    this.rides.push(ride);
    return ride;
  }
  async findByCustomerId(customerId: string): Promise<Ride[]> {
    return this.rides.filter((ride) => ride.customerId === customerId);
  }
  async findByDriverId(driverId: number): Promise<Ride[]> {
    return this.rides.filter((r) => r.driver.id === driverId);
  }
}
