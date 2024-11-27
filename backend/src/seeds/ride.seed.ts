import { DataSource } from 'typeorm';
import { inject, injectable } from 'inversify';
import { TYPES } from '@shared/di/Types';
import { CustomerORM } from '@data/datasources/entities/Customer';
import { DriverORM } from '@data/datasources/entities/Driver';
import { LocationORM } from '@data/datasources/entities/Location';
import { RideORM } from '@data/datasources/entities/Ride';

@injectable()
export class RideSeedService {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) { }

  async seedRides() {
    const rideRepository = this.dataSource.getRepository(RideORM);
    const customerRepository = this.dataSource.getRepository(CustomerORM);
    const driverRepository = this.dataSource.getRepository(DriverORM);
    const locationRepository = this.dataSource.getRepository(LocationORM);

    const existingRides = await rideRepository.count();
    if (existingRides >= 5) {
      return;
    }

    const locationsData = [
      {
        id: 1,
        address: 'Central Park',
        latitude: 40.785091,
        longitude: -73.968285,
      },
      { id: 2, address: 'Times Square', latitude: 40.758, longitude: -73.9855 },
    ];

    const existingLocations = await locationRepository.find();
    if (existingLocations.length < locationsData.length) {
      for (const locationData of locationsData) {
        const locationOrm = new LocationORM();
        locationOrm.id = locationData.id;
        locationOrm.address = locationData.address;
        locationOrm.latitude = locationData.latitude;
        locationOrm.longitude = locationData.longitude;

        await locationRepository.save(locationOrm);
      }

      const customers = await customerRepository.find();
      const drivers = await driverRepository.find();

      if (customers.length < 2 || drivers.length < 2) {
        console.error(
          'Certifique-se de ter dados suficientes em Customer e Driver antes de executar este seed.',
        );
        return;
      }

      const ridesData = [
        {
          id: 1,
          distance: 10.5,
          duration: '1500s',
          value: 25.0,
          customer: customers[0],
          driver: drivers[0],
          origin:
            existingLocations[0] ||
            (await locationRepository.findOneBy({ id: 1 })),
          destination:
            existingLocations[1] ||
            (await locationRepository.findOneBy({ id: 2 })),
          createdAt: new Date(),
        },
        {
          id: 2,
          distance: 15.3,
          duration: '340s',
          value: 40.0,
          customer: customers[1],
          driver: drivers[1],
          origin:
            existingLocations[1] ||
            (await locationRepository.findOneBy({ id: 2 })),
          destination:
            existingLocations[0] ||
            (await locationRepository.findOneBy({ id: 1 })),
          createdAt: new Date(),
        },
      ];
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        for (const rideData of ridesData) {
          const rideOrm = new RideORM();
          rideOrm.id = rideData.id;
          rideOrm.distance = rideData.distance;
          rideOrm.duration = rideData.duration;
          rideOrm.value = rideData.value;
          rideOrm.createdAt = rideData.createdAt;
          rideOrm.customer = rideData.customer;
          rideOrm.driver = rideData.driver;
          rideOrm.origin = rideData.origin;
          rideOrm.destination = rideData.destination;

          await rideRepository.save(rideOrm);
        }

        await queryRunner.commitTransaction();
        console.log('Ride seed executado com sucesso!');
      } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('Erro ao executar seed de rides:', error);
      } finally {
        await queryRunner.release();
      }
    }
  }
}
