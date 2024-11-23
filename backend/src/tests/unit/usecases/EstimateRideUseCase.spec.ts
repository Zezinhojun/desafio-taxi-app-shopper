import { EstimateRideUseCase } from '@domain/usecase/EstimateRideUseCase';
import { mockDriverRepository } from '../services/RideService.spec';
import { GoogleMapsDataSource } from '@data/datasources/GoogleMapsDataSource';
import { RideEstimate } from '@domain/entities/RideEstimate';
import { faker } from '@faker-js/faker/.';
import { Location } from '@domain/entities/Location';
import { mockLocationFactory } from '../entities/Location.spec';

jest.mock('@data/datasources/GoogleMapsDataSource');

export const googleMapsDataSourceFactory = (): GoogleMapsDataSource => {
  return new GoogleMapsDataSource();
};

export const mockEstimateRideUseCaseFactory = (): EstimateRideUseCase => {
  return new EstimateRideUseCase(
    mockDriverRepository,
    googleMapsDataSourceFactory(),
  );
};

describe('EstimateRideUseCase', () => {
  let estimateRideUseCase: EstimateRideUseCase;
  let mockGoogleMapsDataSource: jest.Mocked<GoogleMapsDataSource>;
  let mockLocation: Location;

  beforeEach(() => {
    mockLocation = mockLocationFactory();
    mockGoogleMapsDataSource =
      new GoogleMapsDataSource() as jest.Mocked<GoogleMapsDataSource>;
    mockGoogleMapsDataSource.geocodeAddress = jest
      .fn()
      .mockImplementation(async () => {
        return mockLocation;
      });

    mockGoogleMapsDataSource.calculateRote = jest.fn().mockResolvedValue({
      distance: 10,
      duration: '15m',
      polyline: 'mock-polyline',
      originalResponse: {},
    });

    estimateRideUseCase = new EstimateRideUseCase(
      mockDriverRepository,
      mockGoogleMapsDataSource,
    );
  });

  it('should estimate ride successfully', async () => {
    const origin = faker.location.streetAddress();
    const destination = faker.location.streetAddress();
    const customerId = faker.string.uuid();

    const result = await estimateRideUseCase.execute({
      customerId,
      origin,
      destination,
    });

    expect(mockGoogleMapsDataSource.geocodeAddress).toHaveBeenCalledTimes(2);
    expect(mockGoogleMapsDataSource.geocodeAddress).toHaveBeenCalledWith(
      origin,
    );
    expect(mockGoogleMapsDataSource.geocodeAddress).toHaveBeenCalledWith(
      destination,
    );
    expect(mockGoogleMapsDataSource.calculateRote).toHaveBeenCalled();

    expect(result).toBeInstanceOf(RideEstimate);
    expect(result.distance).toBe(10);
    expect(result.duration).toBe('15m');
  });

  it('should throw error when origin and destination are the same', async () => {
    const address = faker.location.streetAddress();
    await expect(
      estimateRideUseCase.execute({
        customerId: faker.string.uuid(),
        origin: address,
        destination: address,
      }),
    ).rejects.toThrow('Invalid ride parameters');
  });
});
