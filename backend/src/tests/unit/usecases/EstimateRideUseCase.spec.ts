import { EstimateRideUseCase } from '@domain/usecase/EstimateRideUseCase';
import { RideEstimate } from '@domain/entities/RideEstimate';
import { faker } from '@faker-js/faker/.';
import { setupTest } from '../../utils/testSetup';

describe('EstimateRideUseCase', () => {
  const setup = () => {
    const test = setupTest(EstimateRideUseCase, true);
    return {
      ...test,
      estimateRideUseCase: test.sut,
    };
  };

  it('should estimate ride successfully', async () => {
    const { estimateRideUseCase, googleMapsDataSource } = setup();
    const origin = faker.location.streetAddress();
    const destination = faker.location.streetAddress();
    const customerId = faker.string.uuid();

    const result = await estimateRideUseCase.execute({
      customerId,
      origin,
      destination,
    });

    expect(googleMapsDataSource?.geocodeAddress).toHaveBeenCalledTimes(2);
    expect(googleMapsDataSource?.geocodeAddress).toHaveBeenCalledWith(origin);
    expect(googleMapsDataSource?.geocodeAddress).toHaveBeenCalledWith(
      destination,
    );
    expect(googleMapsDataSource?.calculateRote).toHaveBeenCalled();

    expect(result).toBeInstanceOf(RideEstimate);
    expect(result.distance).toBe(10);
    expect(result.duration).toBe('15m');
    expect(result).toBeInstanceOf(RideEstimate);
  });

  it('should throw error when origin and destination are the same', async () => {
    const { estimateRideUseCase } = setup();
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
