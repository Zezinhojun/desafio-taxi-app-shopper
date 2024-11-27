import { RideEstimate } from '@domain/entities/RideEstimate';
import { mockLocationFactory } from './Location.spec';
import { mockDriverFactory } from './Driver.spec';
import { faker } from '@faker-js/faker';

export const mockRideEstimateFactory = (): RideEstimate => {
  const mockOrigin = mockLocationFactory();
  const mockDestination = mockLocationFactory();
  const mockDrivers = Array.from(
    { length: faker.number.int({ min: 10, max: 25 }) },
    () => mockDriverFactory(),
  );

  const rideEstimateParams = {
    origin: mockOrigin,
    destination: mockDestination,
    distance: faker.number.int({ min: 1, max: 100 }),
    duration: `${faker.number.int({ min: 10, max: 60 })}min`,
    options: mockDrivers,
    routeResponse: {},
  };

  return new RideEstimate(rideEstimateParams);
};

describe('RideEstimate', () => {
  let rideEstimate: RideEstimate;
  beforeEach(() => {
    jest.resetAllMocks();
    rideEstimate = mockRideEstimateFactory();
  });

  it('should filter out drivers who are not eligible for the ride distance', () => {
    const eligibleDrivers = rideEstimate.listAvailableDrivers();

    eligibleDrivers.forEach((driver) => {
      expect(driver.isEligibleForDistance(rideEstimate.distance)).toBe(true);
    });
  });

  it('should sort drivers by the lowest ride value', () => {
    const sortedDrivers = rideEstimate.listAvailableDrivers();

    expect(
      sortedDrivers[0].calculateRideValue(rideEstimate.distance),
    ).toBeLessThanOrEqual(
      sortedDrivers[1].calculateRideValue(rideEstimate.distance),
    );
    expect(
      sortedDrivers[1].calculateRideValue(rideEstimate.distance),
    ).toBeLessThanOrEqual(
      sortedDrivers[2].calculateRideValue(rideEstimate.distance),
    );
  });

  it('should return an empty array if no driver is eligible for the ride distance', () => {
    const mockDrivers = [
      mockDriverFactory(),
      mockDriverFactory(),
      mockDriverFactory(),
    ];
    mockDrivers.forEach((driver) => {
      jest.spyOn(driver, 'isEligibleForDistance').mockReturnValue(false);
    });

    const rideEstimate = mockRideEstimateFactory();
    rideEstimate.availableDrivers = mockDrivers;

    const eligibleDrivers = rideEstimate.listAvailableDrivers();
    expect(eligibleDrivers).toHaveLength(0);
  });
});
