import { Driver } from '@domain/entities/Driver';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';

export class DriverRepository implements IDriverRepository {
  private readonly drivers: Driver[] = [];

  async findById(id: number): Promise<Driver | null> {
    const driver = this.drivers.find((d) => d.id === id);
    return driver || null;
  }
  async findEligibleDrivers(distance: number): Promise<Driver[]> {
    return this.drivers.filter((d) => d.isEligibleForDistance(distance));
  }
}
