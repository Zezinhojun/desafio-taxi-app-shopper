import { GoogleMapsDataSource } from '@data/datasources/GoogleMapsDataSource';
import { Customer } from '@domain/entities/Customer';
import { Driver } from '@domain/entities/Driver';
import { Ride } from '@domain/entities/Ride';
import { ConfirmRideUseCase } from '@domain/usecase/ConfirmRideUserCase';
import { EstimateRideUseCase } from '@domain/usecase/EstimateRideUseCase';
import { GetRideHistoryUseCase } from '@domain/usecase/GetRideHistoryUseCase';
import {
  InMemoryRideRepository,
  InMemoryDriverRepository,
  InMemoryCustomerRepository,
} from '../inMemoryRepositories/index';
import { mockCustomerFactory } from '../unit/entities/Customer.spec';
import { mockDriverFactory } from '../unit/entities/Driver.spec';
import { mockRideFactory } from '../unit/entities/Ride.spec';
import { Location } from '@domain/entities/Location';
import { mockLocationFactory } from '..//unit/entities/Location.spec';
import { RideService } from '@domain/services/RideService';

export interface TestSetup<T> {
  sut: T;
  rideRepository: InMemoryRideRepository;
  customerRepository: InMemoryCustomerRepository;
  driverRepository: InMemoryDriverRepository;
  googleMapsDataSource?: jest.Mocked<GoogleMapsDataSource>;
  mockRide: Ride;
  mockCustomer: Customer;
  mockDriver: Driver;
  mockLocation?: Location;
}

export const setupTest = <T>(
  UseCaseClass: new (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => T,
  includeGoogleMaps: boolean = false,
): TestSetup<T> => {
  const rideRepository = new InMemoryRideRepository();
  const customerRepository = new InMemoryCustomerRepository();
  const driverRepository = new InMemoryDriverRepository();

  const mockCustomer = mockCustomerFactory();
  const mockDriver = mockDriverFactory();
  const mockRide = mockRideFactory({
    customerId: mockCustomer.id,
    driver: mockDriver,
  });

  let googleMapsDataSource: jest.Mocked<GoogleMapsDataSource> | undefined;
  let mockLocation: Location | undefined;

  if (includeGoogleMaps) {
    jest.mock('@data/datasources/GoogleMapsDataSource');
    mockLocation = mockLocationFactory();
    googleMapsDataSource =
      new GoogleMapsDataSource() as jest.Mocked<GoogleMapsDataSource>;

    googleMapsDataSource.geocodeAddress = jest
      .fn()
      .mockImplementation(async () => mockLocation);
    googleMapsDataSource.calculateRote = jest.fn().mockResolvedValue({
      distance: 10,
      duration: '15m',
      polyline: 'mock-polyline',
      originalResponse: {},
    });
  }

  let sut: T;
  if (UseCaseClass === EstimateRideUseCase) {
    sut = new UseCaseClass(driverRepository, googleMapsDataSource);
  } else if (UseCaseClass === RideService) {
    sut = new UseCaseClass(
      new ConfirmRideUseCase(
        rideRepository,
        customerRepository,
        driverRepository,
      ),
    );
  } else {
    sut = new UseCaseClass(
      rideRepository,
      customerRepository,
      driverRepository,
    );
  }

  rideRepository.ridesList = [mockRide];
  customerRepository.customersList = [mockCustomer];
  driverRepository.driversList = [mockDriver];

  return {
    sut,
    rideRepository,
    customerRepository,
    driverRepository,
    googleMapsDataSource,
    mockRide,
    mockCustomer,
    mockDriver,
    mockLocation,
  };
};

export const mockEstimateRideUseCaseFactory = (): EstimateRideUseCase => {
  const googleMapsDataSource = new GoogleMapsDataSource();
  return new EstimateRideUseCase(
    new InMemoryDriverRepository(),
    googleMapsDataSource,
  );
};

export const mockConfirmRideUseCaseFactory = (): ConfirmRideUseCase => {
  return new ConfirmRideUseCase(
    new InMemoryRideRepository(),
    new InMemoryCustomerRepository(),
    new InMemoryDriverRepository(),
  );
};

export const mockGetRideHistoryUseCaseFactory = (): GetRideHistoryUseCase => {
  return new GetRideHistoryUseCase(
    new InMemoryRideRepository(),
    new InMemoryCustomerRepository(),
  );
};
