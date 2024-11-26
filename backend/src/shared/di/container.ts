import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { Container } from 'inversify';
import { TYPES } from './Types';
import { RideRepository } from '@data/repositories/RideRepository';
import { CustomerRepository } from '@data/repositories/CustomerRepository';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { GoogleMapsDataSource } from '@data/datasources/GoogleMapsDataSource';
import { EstimateRideUseCase } from '@domain/usecase/EstimateRideUseCase';
import { IRideController } from '@domain/interfaces/IRideController';
import { RideService } from '@domain/services/RideService';
import { ConfirmRideUseCase } from '@domain/usecase/ConfirmRideUserCase';
import { GetRideHistoryUseCase } from '@domain/usecase/GetRideHistoryUseCase';
import { RideController } from '@presentation/controllers/RideController';
import { RideRoutes } from '@presentation/routes/rideRoutes';
import { AppDataSource } from '@data/datasources/DatabaseDataSource';
import { DataSource } from 'typeorm';
import { DriverRepository } from '@data/repositories/DriverRepository';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';

const container = new Container();

async function initializeDataSource() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized successfully!');
  } catch (error) {
    console.error('Error initializing Data Source:', error);
    throw error;
  }
}

async function initializeContainer() {
  await initializeDataSource();

  container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);
  container.bind<IDriverRepository>(TYPES.DriverRepository).to(DriverRepository)

  container.bind<IRideRepository>(TYPES.RideRepository).to(RideRepository);
  container
    .bind<ICustomerRepository>(TYPES.CustomerRepository)
    .to(CustomerRepository);

  container
    .bind<GoogleMapsDataSource>(TYPES.GoogleMapsDataSource)
    .to(GoogleMapsDataSource);
  container
    .bind<EstimateRideUseCase>(TYPES.EstimateRideUseCase)
    .to(EstimateRideUseCase);
  container
    .bind<GetRideHistoryUseCase>(TYPES.GetRideHistoryUseCase)
    .to(GetRideHistoryUseCase);
  container
    .bind<ConfirmRideUseCase>(TYPES.ConfirmRideUseCase)
    .to(ConfirmRideUseCase);
  container.bind<RideService>(TYPES.RideService).to(RideService);
  container.bind<IRideController>(TYPES.RideController).to(RideController);
  container.bind<RideRoutes>(TYPES.RideRoutes).to(RideRoutes);
}

export { container, initializeContainer };
