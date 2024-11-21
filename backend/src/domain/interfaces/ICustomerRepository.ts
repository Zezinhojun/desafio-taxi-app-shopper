import { Customer } from '@domain/entities/Customer';

export interface ICustomerRepository {
  findById(id: string): Promise<Customer | null>;
}
