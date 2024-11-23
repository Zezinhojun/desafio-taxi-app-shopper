import { Driver, DriverParams } from '@domain/entities/Driver';
import { faker } from '@faker-js/faker/.';
import { mockVehicleFactory } from './Vehicle.spec';

export const mockDriverFactory = (
  overrides: Partial<DriverParams> = {},
): Driver => {
  const driver: DriverParams = {
    id: faker.number.int(),
    name: faker.internet.username(),
    description: faker.lorem.sentence(),
    vehicle: mockVehicleFactory(),
    ratePerKm: faker.number.float({ min: 1, max: 5 }),
    minimunDistance: faker.number.int({ min: 1, max: 10 }),
    ...overrides,
  };
  return new Driver(driver);
};

describe('Driver', () => {
  let driver: Driver;
  beforeEach(() => {
    driver = mockDriverFactory();
  });

  it('should create a Driver with valid data', () => {
    expect(driver).toBeInstanceOf(Driver);
  });

  it('should calculate the ride value correctly', () => {
    const distance = 10;
    const expectedValue = distance * driver.ratePerKm;
    expect(driver.calculateRideValue(distance)).toBe(expectedValue);
  });
  it('should determine if the driver is eligible for the ride distance', () => {
    const shortDistance = 0.4;
    const longDistance = 15;
    expect(driver.isEligibleForDistance(shortDistance)).toBeFalsy();
    expect(driver.isEligibleForDistance(longDistance)).toBeTruthy();
  });
});
