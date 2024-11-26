import { Ride } from '@domain/entities/Ride';

export interface IRideRepository {
  create(ride: Ride): Promise<Ride>;
  findByCustomerId(customerId: string): Promise<Ride[] | null>;
  findByDriverId(driverId: number): Promise<Ride[] | null>;
}
