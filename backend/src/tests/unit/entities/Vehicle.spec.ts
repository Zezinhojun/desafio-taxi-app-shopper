import { Vehicle, VehicleParams } from '@domain/entities/Vehicle';
import { faker } from '@faker-js/faker';

export const mockVehicleFactory = (): Vehicle => {
  const vehicle: VehicleParams = {
    model: faker.vehicle.model(),
    description: faker.lorem.sentence(),
  };

  return new Vehicle(vehicle);
};

describe('Vehicle', () => {
  it('Should create a Vehicle with valid data', () => {
    expect(mockVehicleFactory()).toBeInstanceOf(Vehicle);
  });
});
