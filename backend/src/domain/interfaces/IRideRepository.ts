import { Ride } from '@domain/entities/Ride';

export interface IRideRepository {
  findByDriverId(driverId: number): Promise<Ride[]>;
  save(ride: Ride): Promise<Ride>;
}
