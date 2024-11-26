import { Driver } from '@domain/entities/Driver';
import { Location } from '@domain/entities/Location';
import { Review } from '@domain/entities/Review';
import { Ride } from '@domain/entities/Ride';
import { Vehicle } from '@domain/entities/Vehicle';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { injectable } from 'inversify';

@injectable()
export class RideRepository implements IRideRepository {
  private readonly rides: Ride[] = [
    new Ride({
      customerId: '12345',
      origin: new Location({
        address: 'Rua Reta',
        latitude: 122,
        longitude: 204,
      }),
      destination: new Location({
        address: 'Rua Torta',
        latitude: 123,
        longitude: 205,
      }),
      distance: 10,
      duration: '15 min',
      driver: new Driver({
        id: 2,
        name: 'Dominic Toretto',
        description:
          'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        vehicle: new Vehicle({
          id: '2',
          model: 'Dodge Charger R/T 1970 modificado',
          description: 'Veículo potente e modificado para corridas.',
        }),
        review: new Review({
          rating: 4,
          comment:
            'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        }),
        ratePerKm: 5.0,
        minimumDistance: 5,
      }),
      value: 25.0,
      date: new Date('2024-11-23T10:00:00'),
    }),
    new Ride({
      customerId: '12345',
      origin: new Location({
        address: 'Rua direita',
        latitude: 122,
        longitude: 204,
      }),
      destination: new Location({
        address: 'Rua esquerda',
        latitude: 123,
        longitude: 205,
      }),
      distance: 10,
      duration: '15 min',
      driver: new Driver({
        id: 3,
        name: 'James Bond',
        description:
          'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        vehicle: new Vehicle({
          id: '3',
          model: 'Aston Martin DB5 clássico',
          description: 'Carro clássico e elegante com recursos secretos.',
        }),
        review: new Review({
          rating: 5,
          comment:
            'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        }),
        ratePerKm: 10.0,
        minimumDistance: 10,
      }),
      value: 25.0,
      date: new Date('2022-11-23T10:00:00'),
    }),
  ];

  async create(ride: Ride): Promise<Ride> {
    this.rides.push(ride);
    return ride;
  }
  async findByCustomerId(customerId: string): Promise<Ride[]> {
    return this.rides.filter((ride) => ride.customerId === customerId);
  }
  async findByDriverId(driverId: number): Promise<Ride[]> {
    return this.rides.filter((r) => r.driver.id === driverId);
  }
  async findByCustomerAndDriver(customerId: string, driverId: number) {
    return this.rides.filter(
      (ride) => ride.customerId === customerId && ride.driver.id === driverId,
    );
  }
}
