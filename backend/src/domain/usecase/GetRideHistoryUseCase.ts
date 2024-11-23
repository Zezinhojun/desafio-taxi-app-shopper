import { Ride } from '@domain/entities/Ride';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { IRideRepository } from '@domain/interfaces/IRideRepository';

export class GetRideHistoryUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
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
