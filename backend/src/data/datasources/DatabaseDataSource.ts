import { DataSource } from 'typeorm';
import { DriverORM } from './entities/Driver';
import { RideORM } from './entities/Ride';
import { CustomerORM } from './entities/Customer';
import { ReviewORM } from './entities/Review';
import { LocationORM } from './entities/Location';
import { VehicleORM } from './entities/Vehicle';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'taxi_app',
  synchronize: true,
  entities: [
    VehicleORM,
    DriverORM,
    RideORM,
    CustomerORM,
    ReviewORM,
    LocationORM,
  ],
});
