import { Ride } from '@domain/entities/Ride';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { TYPES } from '@shared/di/Types';
import { inject } from 'inversify';

export class GetRideHistoryUseCase {
  constructor(
    @inject(TYPES.RideRepository)
    private readonly rideRepository: IRideRepository,
    @inject(TYPES.CustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(customerId: string): Promise<Ride[]> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const rides = await this.rideRepository.findByCustomerId(customerId);
    return rides;
  }
}
