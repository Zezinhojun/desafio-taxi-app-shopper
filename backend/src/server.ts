import { GoogleMapsDataSource } from '@data/datasources/GoogleMapsDataSource';
import { CustomerRepository } from '@data/repositories/CustomerRepository';
import { DriverRepository } from '@data/repositories/DriverRepository';
import { RideRepository } from '@data/repositories/RideRepository';
import { RideService } from '@domain/services/RideService';
import { ConfirmRideUseCase } from '@domain/usecase/ConfirmRideUserCase';
import { EstimateRideUseCase } from '@domain/usecase/EstimateRideUseCase';
import { GetRideHistoryUseCase } from '@domain/usecase/GetRideHistoryUseCase';
import { RideController } from '@presentation/controllers/RideController';
import { RideRoutes } from '@presentation/routes/rideRoutes';
import ErrorHandler from '@shared/utils/errorHandler';
import express from 'express';

const app = express();
app.use(express.json());

const googleDataSource = new GoogleMapsDataSource();
const rideRepository = new RideRepository();
const customerRepository = new CustomerRepository();
const driverRepository = new DriverRepository();
const estimateRideUseCase = new EstimateRideUseCase(
  driverRepository,
  googleDataSource,
);
const getHistoryRideUseCase = new GetRideHistoryUseCase(
  rideRepository,
  customerRepository,
);
const confirmRideUseCase = new ConfirmRideUseCase(
  rideRepository,
  customerRepository,
  driverRepository,
);

const rideService = new RideService(
  confirmRideUseCase,
  estimateRideUseCase,
  getHistoryRideUseCase,
);
const rideController = new RideController(rideService);
const rideRoutes = new RideRoutes(rideController);

app.use('/api/rides', rideRoutes.router);

app.use(ErrorHandler.handleErrors);
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
