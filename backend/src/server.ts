import 'reflect-metadata';
import { RideRoutes } from '@presentation/routes/rideRoutes';
import ErrorHandler from '@shared/utils/errorHandler';
import express from 'express';
import cors from 'cors';
import { container } from '@shared/di/container';
import { TYPES } from '@shared/di/Types';
import { AppDataSource } from '@data/datasources/DatabaseDataSource';

const app = express();
app.use(express.json());
app.use(cors());

// Função para tentar conectar ao banco de dados com retries
const connectToDatabase = async (retries = 10, delay = 2000) => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    if (retries === 0) {
      console.error('Error during Data Source initialization:', err);
      process.exit(1); // Exit the process if it fails after retries
    } else {
      console.log(`Retrying connection to database. Attempts left: ${retries}`);
      await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
      await connectToDatabase(retries - 1, delay);
    }
  }
};

// Conectar ao banco de dados antes de inicializar as rotas e o servidor
connectToDatabase()
  .then(() => {
    // Conexão estabelecida, agora podemos inicializar as rotas e o servidor
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
  });
