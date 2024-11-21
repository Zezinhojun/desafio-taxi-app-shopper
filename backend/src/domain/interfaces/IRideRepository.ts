import { Ride } from '@domain/entities/Ride';

export interface IRideRepository {
  create(ride: Ride): Promise<Ride>;
  findByCustomerId(customerId: string): Promise<Ride[]>;
  findByDriverId(driverId: number): Promise<Ride[]>;
}
