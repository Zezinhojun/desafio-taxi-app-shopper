import { Ride } from '@domain/entities/Ride';
import { IRideRepository } from '@domain/interfaces/IRideRepository';

export class InMemoryRideRepository implements IRideRepository {

  async save(ride: Ride): Promise<Ride> {
    this.rides.push(ride);
    return ride;
  }
  private readonly rides: Ride[] = [];

  async findByCustomerId(customerId: string): Promise<Ride[]> {
    return this.rides.filter((ride) => ride.customerId === customerId);
  }
  async findByDriverId(driverId: number): Promise<Ride[]> {
    return this.rides.filter((r) => r.driver.id === driverId);
  }

  clear(): void {
    this.rides.length = 0;
  }

  set ridesList(rides: Ride[]) {
    this.rides.push(...rides);
  }

  get ridesList(): Ride[] {
    return this.rides;
  }
}
