import { Driver } from '@domain/entities/Driver';
import * as fs from 'fs';
import * as path from 'path';

const fixedDrivers = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../utils/drivers.json'), 'utf-8'),
);

export const mockDriverFactory = (driverId?: number): Driver => {
  const driverData = driverId
    ? fixedDrivers.find((d: Driver) => d.id === driverId) || fixedDrivers[0]
    : fixedDrivers[Math.floor(Math.random() * fixedDrivers.length)];

  return new Driver(driverData);
};

describe('Driver', () => {
  let driver: Driver;
  beforeEach(() => {
    jest.resetAllMocks();
    driver = mockDriverFactory();
  });

  it('should create a Driver with valid data', () => {
    expect(driver).toBeInstanceOf(Driver);
    expect(driver.id).toBeDefined();
    expect(driver.ratePerKm).toBeDefined();
    expect(driver.isEligibleForDistance(1)).toBeDefined();
  });
  it('should calculate the ride value correctly', () => {
    const distance = 10;
    const expectedValue = distance * driver.ratePerKm;
    expect(driver.calculateRideValue(distance)).toBe(expectedValue);
  });

  it('should determine if the driver is eligible for the ride distance', () => {
    const shortDistance = 0.4;
    const longDistance = 10;

    expect(driver.isEligibleForDistance(shortDistance)).toBeFalsy();
    expect(driver.isEligibleForDistance(longDistance)).toBeTruthy();
  });
});
