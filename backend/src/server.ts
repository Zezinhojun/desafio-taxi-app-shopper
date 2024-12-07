import 'reflect-metadata';
import { RideRoutes } from '@presentation/routes/rideRoutes';
import ErrorHandler from '@shared/utils/errorHandler';
import express from 'express';
import cors from 'cors';
import { container, initializeContainer } from '@shared/di/container';
import { TYPES } from '@shared/di/Types';

const app = express();
app.use(express.json());
app.use(cors());

initializeContainer()
  .then(() => {
    const rideRoutes = container.get<RideRoutes>(TYPES.RideRoutes);
    app.use('/rides', rideRoutes.router);

    app.use(ErrorHandler.handleErrors);

    const PORT = process.env.PORT ?? 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during application startup:', err);
    process.exit(1);
  });
