import { Customer } from '@domain/entities/Customer';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';

export class CustomerRepository implements ICustomerRepository {
  private readonly customers: Customer[] = [
    new Customer({
      id: '12345',
      rideHistory: [],
    }),
    new Customer({
      id: '67890',
      rideHistory: [],
    }),
  ];

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find((c) => c.id === id);
    return customer || null;
  }
}
