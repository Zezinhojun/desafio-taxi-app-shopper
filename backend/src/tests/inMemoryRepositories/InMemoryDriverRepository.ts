import { Driver } from '@domain/entities/Driver';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';

export class InMemoryDriverRepository implements IDriverRepository {
  private readonly drivers: Driver[] = [];

  async findById(id: number): Promise<Driver | null> {
    const driver = this.drivers.find((d) => d.id === id);
    return driver || null;
  }
  async findEligibleDrivers(distance: number): Promise<Driver[]> {
    return this.drivers.filter((d) => d.isEligibleForDistance(distance));
  }

  clear(): void {
    this.drivers.length = 0;
  }

  set driversList(drivers: Driver[]) {
    this.drivers.push(...drivers);
  }

  get driversList(): Driver[] {
    return this.drivers;
  }
}
