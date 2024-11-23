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
import { RideController } from '@presentation/controllers/RideController';

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
  rideService?: RideService;
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

  const googleMapsDataSource: jest.Mocked<GoogleMapsDataSource> =
    new GoogleMapsDataSource() as jest.Mocked<GoogleMapsDataSource>;

  let mockLocation: Location | undefined;
  let rideService: RideService | undefined;

  jest.mock('@data/datasources/GoogleMapsDataSource');

  if (includeGoogleMaps) {
    mockLocation = mockLocationFactory();

    googleMapsDataSource.geocodeAddress = jest
      .fn()
      .mockImplementation(async () => mockLocation);
    googleMapsDataSource.calculateRote = jest.fn().mockResolvedValue({
      distance: 10,
      duration: '15m',
      polyline: 'mock-polyline',
      originalResponse: {},
    });
  } else {
    googleMapsDataSource.geocodeAddress = jest.fn();
    googleMapsDataSource.calculateRote = jest.fn();
  }

  let sut: T;
  if (UseCaseClass === RideController) {
    const estimateRideUseCase = new EstimateRideUseCase(
      driverRepository,
      googleMapsDataSource,
    );
    const confirmRideUseCase = new ConfirmRideUseCase(
      rideRepository,
      customerRepository,
      driverRepository,
    );
    const getRideHistoryUseCase = new GetRideHistoryUseCase(
      rideRepository,
      customerRepository,
    );

    rideService = new RideService(
      confirmRideUseCase,
      estimateRideUseCase,
      getRideHistoryUseCase,
    );

    sut = new RideController(rideService) as T;
  } else if (UseCaseClass === EstimateRideUseCase) {
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
