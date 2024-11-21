import { Driver } from '@domain/entities/Driver';

export interface IDriverRepository {
  findById(id: number): Promise<Driver | null>;
  findEligibleDrivers(distance: number): Promise<Driver[]>;
}
