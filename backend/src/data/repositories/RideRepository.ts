import { RideORM } from '@data/datasources/entities/Ride';
import { RideMapper } from '@data/mappers/RideMapper';
import { Ride } from '@domain/entities/Ride';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

@injectable()
export class RideRepository implements IRideRepository {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) {}

  private get rideRepository(): Repository<RideORM> {
    return this.dataSource.getRepository(RideORM);
  }

  async create(ride: Ride): Promise<Ride> {
    const rideOrm = RideMapper.toOrm(ride);
    const savedRide = await this.rideRepository.save(rideOrm);
    return RideMapper.toDomain(savedRide);
  }

  async findByCustomerId(customerId: string): Promise<Ride[]> {
    console.log(`Finding rides for customer ID: ${customerId}`);
  
    // Buscar as corridas no banco de dados
    const ridesOrm = await this.rideRepository.find({
      where: { customer: { id: customerId } },
      relations: [
        'customer',
        'driver',
        'driver.vehicle',
        'driver.reviews',
        'origin',
        'destination',
      ],
    });
  
    // Verificar se as corridas foram encontradas
    console.log(`Rides ORM fetched: ${ridesOrm.length} rides found`);
  
    // Mapear para o modelo de domínio
    const mappedRides = ridesOrm ? ridesOrm.map((ride) => {
      console.log("Mapping ride:", ride);  // Logando cada corrida antes do mapeamento
      return RideMapper.toDomain(ride);
    }) : [];
  
    console.log(`Mapped rides: ${mappedRides.length} rides mapped`);
  
    return mappedRides;
  }
  async findByDriverId(driverId: number): Promise<Ride[]> {
    const ridesOrm = await this.rideRepository.find({
      where: { driver: { id: driverId } },
      relations: [
        'customer',
        'driver',
        'driver.vehicle',
        'driver.reviews',
        'origin',
        'destination',
      ],
    });
    return ridesOrm ? ridesOrm.map(RideMapper.toDomain) : [];
  }

  async findByCustomerAndDriver(
    customerId: string,
    driverId: number,
  ): Promise<Ride[]> {
    const ridesOrm = await this.rideRepository.find({
      where: {
        customer: { id: customerId },
        driver: { id: driverId },
      },
      relations: [
        'customer',
        'driver',
        'driver.vehicle',
        'driver.reviews',
        'origin',
        'destination',
      ],
    });
    return ridesOrm ? ridesOrm.map(RideMapper.toDomain) : [];
  }
}
