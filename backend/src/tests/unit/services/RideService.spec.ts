import { Customer } from '@domain/entities/Customer';
import { Driver } from '@domain/entities/Driver';
import { Ride } from '@domain/entities/Ride';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { RideService } from '@domain/services/RideService';
import { mockRideFactory } from '../entities/Ride.spec';
import { mockDriverFactory } from '../entities/Driver.spec';
import { mockCustomerFactory } from '../entities/Customer.spec';

const mockCustomerRepository: jest.Mocked<ICustomerRepository> = {
  findById: jest.fn(),
};

const mockDriverRepository: jest.Mocked<IDriverRepository> = {
  findById: jest.fn(),
  findEligibleDrivers: jest.fn(),
};

const mockRideRepository: jest.Mocked<IRideRepository> = {
  create: jest.fn(),
  findByCustomerId: jest.fn(),
  findByDriverId: jest.fn(),
};

export const mockRideServiceFactory = (): RideService => {
  return new RideService(
    mockRideRepository,
    mockDriverRepository,
    mockCustomerRepository,
  );
};

describe('RideService', () => {
  let rideService: RideService;
  let mockRide: Ride;
  let mockDriver: Driver;
  let mockCustomer: Customer;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRide = mockRideFactory();
    mockCustomer = mockCustomerFactory();
    mockDriver = mockDriverFactory();
    rideService = mockRideServiceFactory();
  });

  it('should confirm a ride successfully', async () => {
    mockCustomerRepository.findById.mockResolvedValue(mockCustomer);
    mockDriverRepository.findById.mockResolvedValue(mockDriver);
    mockRideRepository.create.mockResolvedValue(mockRide);

    const result = await rideService.confirmRide(mockCustomer.id, mockRide);

    expect(result).toBeInstanceOf(Ride);
    expect(mockRideRepository.create).toHaveBeenCalled();
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
