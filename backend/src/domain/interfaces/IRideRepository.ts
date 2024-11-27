import { Ride } from '@domain/entities/Ride';

export interface IRideRepository {
  findByCustomerId(customerId: string): Promise<Ride[]>;
  findByDriverId(driverId: number): Promise<Ride[]>;
  save(ride: Ride): Promise<Ride>;
}
