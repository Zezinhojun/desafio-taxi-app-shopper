import { GetRideHistoryUseCase } from '@domain/usecase/GetRideHistoryUseCase';
import {
  mockCustomerRepository,
  mockRideRepository,
} from '../services/RideService.spec';
import { Customer } from '@domain/entities/Customer';
import { mockCustomerFactory } from '../entities/Customer.spec';
import { Ride } from '@domain/entities/Ride';
import { mockRideFactory } from '../entities/Ride.spec';

export const mockGetRideHistoryUseCaseFactory = (): GetRideHistoryUseCase => {
  return new GetRideHistoryUseCase(mockRideRepository, mockCustomerRepository);
};

describe('GetRideHistoryUseCase', () => {
  let getRideHistoryUseCase: GetRideHistoryUseCase;
  let mockCustomer: Customer;
  let mockRide: Ride;

  beforeEach(() => {
    mockCustomer = mockCustomerFactory();
    mockRide = mockRideFactory({
      customerId: mockCustomer.id,
    });

    getRideHistoryUseCase = mockGetRideHistoryUseCaseFactory();

    mockCustomerRepository.findById.mockResolvedValue(mockCustomer);
    mockRideRepository.create.mockResolvedValue(mockRide);
  });

  it('should return the list of rides for the customer', async () => {
    const mockRides = [mockRide];
    mockRideRepository.findByCustomerId.mockResolvedValue(mockRides);

    const result = await getRideHistoryUseCase.execute(mockCustomer.id);
    expect(mockRideRepository.findByCustomerId).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockRides);
  });

  it('should return an empty list if no rides are found for the customer', async () => {
    mockRideRepository.findByCustomerId.mockResolvedValue([]);

    const result = await getRideHistoryUseCase.execute(mockCustomer.id);

    expect(mockRideRepository.findByCustomerId).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
    expect(mockCustomerRepository.findById).toHaveBeenCalledWith(
      mockCustomer.id,
    );
    expect(mockRideRepository.findByCustomerId).toHaveBeenCalledWith(
      mockCustomer.id,
    );
  });
});
