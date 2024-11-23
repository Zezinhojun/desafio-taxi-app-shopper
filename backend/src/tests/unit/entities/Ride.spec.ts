import { Ride, RideParams } from '@domain/entities/Ride';
import { faker } from '@faker-js/faker/.';
import { mockDriverFactory } from './Driver.spec';
import { mockLocationFactory } from './Location.spec';

export const mockRideFactory = (overrides: Partial<RideParams> = {}): Ride => {
  const driver = mockDriverFactory();
  const distance = faker.number.int({ min: 1, max: 100 });
  const rideParams = {
    customerId: faker.string.uuid(),
    origin: mockLocationFactory(),
    destination: mockLocationFactory(),
    distance: distance,
    duration: `${faker.number.int({ min: 10, max: 60 })}min`,
    driver: driver,
    value: driver.calculateRideValue(distance),
    date: new Date(),
    ...overrides,
  };

  return new Ride(rideParams);
};

describe('Ride', () => {
  let ride: Ride;
  beforeEach(() => {
    ride = mockRideFactory();
  });

  it('should create a Ride with valid data', () => {
    expect(ride).toBeInstanceOf(Ride);
  });

  it("should calculate the ride value using the driver's rate per km and distance", () => {
    const expectedValue = ride.driver.calculateRideValue(ride.distance);
    const estimatedValue = ride.estimateRide();
    expect(estimatedValue).toBe(expectedValue);
  });
});
