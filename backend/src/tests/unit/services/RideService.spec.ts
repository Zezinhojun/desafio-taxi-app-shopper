import { Customer } from '@domain/entities/Customer';
import { Ride } from '@domain/entities/Ride';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { RideService } from '@domain/services/RideService';
import { mockRideFactory } from '../entities/Ride.spec';
import { mockCustomerFactory } from '../entities/Customer.spec';
import { mockConfirmRideUseCaseFactory } from '../usecases/ConfirmRideUseCase.spec';
import { mockEstimateRideUseCaseFactory } from '../usecases/EstimateRideUseCase.spec';
import { Driver } from '@domain/entities/Driver';
import { mockDriverFactory } from '../entities/Driver.spec';

export const mockCustomerRepository: jest.Mocked<ICustomerRepository> = {
  findById: jest.fn(),
};

export const mockDriverRepository: jest.Mocked<IDriverRepository> = {
  findById: jest.fn(),
  findEligibleDrivers: jest.fn().mockResolvedValue([
    {
      id: 'driver-id',
      name: 'Mocked Driver',
      available: true,
    },
  ]),
};

export const mockRideRepository: jest.Mocked<IRideRepository> = {
  create: jest.fn(),
  findByCustomerId: jest.fn(),
  findByDriverId: jest.fn(),
};

export const mockRideServiceFactory = (): RideService => {
  return new RideService(
    mockConfirmRideUseCaseFactory(),
    mockEstimateRideUseCaseFactory(),
  );
};

describe('RideService', () => {
  let rideService: RideService;
  let mockRide: Ride;
  let mockCustomer: Customer;
  let mockDriver: Driver;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCustomer = mockCustomerFactory();
    mockDriver = mockDriverFactory();
    mockRide = mockRideFactory({
      customerId: mockCustomer.id,
      driver: mockDriver,
    });
    rideService = mockRideServiceFactory();

    mockCustomerRepository.findById.mockResolvedValue(mockCustomer);
    mockDriverRepository.findById.mockResolvedValue(mockDriver);
    mockRideRepository.create.mockResolvedValue(mockRide);
  });

  it('should confirm a ride successfully', async () => {
    const result = await rideService.confirmRide(mockCustomer.id, mockRide);

    expect(result).toEqual(mockRide);
    expect(result).toBeInstanceOf(Ride);
  });

  it('should throw error when customer is not found', async () => {
    mockCustomerRepository.findById.mockResolvedValue(null);
    await expect(
      rideService.confirmRide(mockCustomer.id, mockRide),
    ).rejects.toThrow('Customer not found');
  });

  it('should throw error when driver is not found', async () => {
    mockCustomerRepository.findById.mockResolvedValue(mockCustomer);
    mockDriverRepository.findById.mockResolvedValue(null);

    await expect(
      rideService.confirmRide(mockCustomer.id, mockRide),
    ).rejects.toThrow('Driver not found');
  });
});
