import { Location, LocationParams } from '@domain/entities/Location';
import { faker } from '@faker-js/faker/.';

export const mockLocationFactory = (): Location => {
  const locationParams: LocationParams = {
    address: faker.location.streetAddress(),
    latitude: faker.number.float({ min: -90, max: 90 }),
    longitude: faker.number.float({ min: -180, max: 180 }),
  };

  return new Location(locationParams);
};

describe('Location', () => {
  let location: Location;
  beforeEach(() => {
    location = mockLocationFactory();
  });

  it('should create a location instance with valid data', () => {
    expect(location).toBeInstanceOf(Location);
  });

  it('should validate a correct address', () => {
    expect(location.validateAddress()).toBeTruthy();
  });

  it('should invalidate an address with empty address field', () => {
    const invalidLocationWithEmptyAddres: LocationParams = {
      address: '',
      latitude: 81,
      longitude: 181,
    };
    const location = new Location(invalidLocationWithEmptyAddres);
    expect(location.validateAddress()).toBeFalsy();
  });
});
