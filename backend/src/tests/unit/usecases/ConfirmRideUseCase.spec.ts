import {
  mockCustomerRepository,
  mockDriverRepository,
  mockRideRepository,
} from './../services/RideService.spec';
import { ConfirmRideUseCase } from '@domain/usecase/ConfirmRideUserCase';
import { Ride } from '@domain/entities/Ride';
import { mockRideFactory } from '../entities/Ride.spec';
import { mockCustomerFactory } from '../entities/Customer.spec';
import { Customer } from '@domain/entities/Customer';
import { Driver } from '@domain/entities/Driver';
import { mockDriverFactory } from '../entities/Driver.spec';

export const mockConfirmRideUseCaseFactory = (): ConfirmRideUseCase => {
  return new ConfirmRideUseCase(
    mockRideRepository,
    mockCustomerRepository,
    mockDriverRepository,
  );
};

describe('ConfirmRideUseCase', () => {
  let confirmRideUseCase: ConfirmRideUseCase;
  let mockRide: Ride;
  let mockDriver: Driver;
  let mockCustomer: Customer;

  beforeEach(() => {
    mockCustomer = mockCustomerFactory();
    mockDriver = mockDriverFactory();
    mockRide = mockRideFactory({
      customerId: mockCustomer.id,
      driver: mockDriver,
    });
    confirmRideUseCase = mockConfirmRideUseCaseFactory();

    mockCustomerRepository.findById.mockResolvedValue(mockCustomer);
    mockDriverRepository.findById.mockResolvedValue(mockDriver);
    mockRideRepository.create.mockResolvedValue(mockRide);
  });

  it('should successfully confirm a ride', async () => {
    const params = {
      customerId: mockCustomer.id,
      rideDetails: mockRide,
    };
    const result = await confirmRideUseCase.execute(params);

    expect(mockCustomerRepository.findById).toHaveBeenCalledWith(
      mockCustomer.id,
    );
    expect(mockDriverRepository.findById).toHaveBeenCalledWith(
      mockRide.driver.id,
    );
    expect(mockRideRepository.create).toHaveBeenCalledWith(mockRide);
    expect(result).toEqual(mockRide);
  });

  it('should throw error if customer is not found', async () => {
    mockCustomerRepository.findById.mockResolvedValue(null);
    const params = {
      customerId: mockCustomer.id,
      rideDetails: mockRide,
    };

    await expect(confirmRideUseCase.execute(params)).rejects.toThrow(
      'Customer not found',
    );
  });

  it('should throw error if driver is not found', async () => {
    mockDriverRepository.findById.mockResolvedValue(null);
    const params = {
      customerId: mockCustomer.id,
      rideDetails: mockRide,
    };

    await expect(confirmRideUseCase.execute(params)).rejects.toThrow(
      'Driver not found',
    );
  });
});
