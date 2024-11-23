import { Customer } from '@domain/entities/Customer';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';

export class InMemoryCustomerRepository implements ICustomerRepository {
  private readonly customer: Customer[] = [];

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customer.find((c) => c.id === id);
    return customer || null;
  }

  clear(): void {
    this.customer.length = 0;
  }

  set customersList(customers: Customer[]) {
    this.customer.push(...customers);
  }

  get customersList(): Customer[] {
    return this.customer;
  }
}
