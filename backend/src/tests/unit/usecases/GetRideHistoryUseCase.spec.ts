import { GetRideHistoryUseCase } from '@domain/usecase/GetRideHistoryUseCase';
import { setupTest, TestSetup } from '../../utils/testSetup';
import { Ride } from '@domain/entities/Ride';

describe('GetRideHistoryUseCase', () => {
  let testSetup: TestSetup<GetRideHistoryUseCase>;

  beforeEach(() => {
    testSetup = setupTest(GetRideHistoryUseCase);

    jest.spyOn(testSetup.rideRepository, 'findByCustomerId');
  });

  it('should return the list of rides for the customer', async () => {
    const { sut, mockCustomer, rideRepository } = testSetup;

    const result = await sut.execute(mockCustomer.id);

    expect(rideRepository.findByCustomerId).toHaveBeenCalledTimes(1);
    expect(result).toEqual(rideRepository.ridesList);
    result.forEach((ride) => {
      expect(ride).toBeInstanceOf(Ride);
    });
  });

  it('should return an empty list if no rides are found for the customer', async () => {
    const { sut, mockCustomer, rideRepository } = testSetup;

    rideRepository.clear();

    const result = await sut.execute(mockCustomer.id);

    expect(rideRepository.findByCustomerId).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);

    expect(result).not.toBeInstanceOf(Ride);
  });
});
