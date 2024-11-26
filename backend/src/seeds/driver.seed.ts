import { DriverORM } from '@data/datasources/entities/Driver';
import { VehicleORM } from '@data/datasources/entities/Vehicle';
import { DriverMapper } from '@data/mappers/DriverMapper';
import { Driver } from '@domain/entities/Driver';
import { Review } from '@domain/entities/Review';
import { Vehicle } from '@domain/entities/Vehicle';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';

@injectable()
export class DriverSeedService {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) { }

  async seedDrivers() {
    const driverRepository = this.dataSource.getRepository(DriverORM);
    const vehicleRepository = this.dataSource.getRepository(VehicleORM);

    const existingDriversCount = await driverRepository.count();
    if (existingDriversCount >= 3) {
      return;
    }

    const driversData = [
      {
        id: 1,
        name: 'Homer Simpson',
        description:
          'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        vehicle: {
          id: "1",
          model: 'Plymouth Valiant 1973 rosa e enferrujado',
          description: 'Carro antigo e peculiar de Homer',
        },
        review: {
          rating: 2,
          comment:
            'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        },
        ratePerKm: 2.5,
        minimumDistance: 1,
      },
      {
        id: 2,
        name: 'Dominic Toretto',
        description:
          'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        vehicle: {
          id: "2",
          model: 'Dodge Charger R/T 1970 modificado',
          description: 'Carro potente e modificado para corridas.',
        },
        review: {
          rating: 4,
          comment:
            'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        },
        ratePerKm: 5.0,
        minimumDistance: 5,
      },
      {
        id: 3,
        name: 'James Bond',
        description:
          'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        vehicle: {
          id: "3",
          model: 'Aston Martin DB5 clássico',
          description: 'Carro clássico e elegante com recursos secretos.',
        },
        review: {
          rating: 5,
          comment:
            'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        },
        ratePerKm: 10.0,
        minimumDistance: 10,
      },
    ];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const vehiclesData = driversData.map(driverData => ({
        id: driverData.vehicle.id,
        model: driverData.vehicle.model,
        description: driverData.vehicle.description
      }));

      for (const vehicleData of vehiclesData) {
        const vehicleOrm = new VehicleORM();
        vehicleOrm.id = vehicleData.id;
        vehicleOrm.model = vehicleData.model;
        vehicleOrm.description = vehicleData.description;

        await vehicleRepository.save(vehicleOrm);
      }
      for (const driverData of driversData) {
        const vehicle = new Vehicle({
          id: driverData.vehicle.id,
          model: driverData.vehicle.model,
          description: driverData.vehicle.description,
        });

        const review = new Review({
          rating: driverData.review.rating,
          comment: driverData.review.comment,
        });

        const driverDomain = new Driver({
          id: driverData.id,
          name: driverData.name,
          description: driverData.description,
          vehicle: vehicle,
          review: review,
          ratePerKm: driverData.ratePerKm,
          minimumDistance: driverData.minimumDistance,
        });

        const driverOrm = DriverMapper.toOrm(driverDomain);

        await driverRepository.save(driverOrm);
      }

      await queryRunner.commitTransaction();
      console.log('Drivers seed executado com sucesso!');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Erro ao executar seed de drivers:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
