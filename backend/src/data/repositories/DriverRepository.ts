import { Driver } from '@domain/entities/Driver';
import { Review } from '@domain/entities/Review';
import { Vehicle } from '@domain/entities/Vehicle';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';

export class DriverRepository implements IDriverRepository {
  private readonly drivers: Driver[] = [
    new Driver({
      id: 1,
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: new Vehicle({
        model: 'Plymouth Valiant 1973 rosa e enferrujado',
        description: 'Carro velho e clássico com muitos anos de estrada.',
      }),
      review: new Review({
        rating: 2,
        comment:
          'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      }),
      ratePerKm: 2.5,
      minimumDistance: 1,
    }),
    new Driver({
      id: 2,
      name: 'Dominic Toretto',
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: new Vehicle({
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
    new Driver({
      id: 3,
      name: 'James Bond',
      description:
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      vehicle: new Vehicle({
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
  ];

  async findById(id: number): Promise<Driver | null> {
    const driver = this.drivers.find((d) => d.id === id);
    return driver || null;
  }
  async findEligibleDrivers(distance: number): Promise<Driver[]> {
    return this.drivers.filter((d) => d.isEligibleForDistance(distance));
  }
}
