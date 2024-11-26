import { CustomerORM } from '@data/datasources/entities/Customer';
import { CustomerMapper } from '@data/mappers/CustomerMapper';
import { Customer } from '@domain/entities/Customer';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

@injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) { }

  private get customerRepository(): Repository<CustomerORM> {
    return this.dataSource.getRepository(CustomerORM);
  }

  async findById(customerId: string): Promise<Customer | null> {
    console.log(`Searching for customer with ID: ${customerId}`);

    const customerOrm = await this.customerRepository.findOne({
      where: { id: customerId }
    });

    if (!customerOrm) {
      console.log(`Customer with ID ${customerId} not found.`);
      return null;
    }

    console.log('Customer found:', customerOrm);

    return CustomerMapper.toDomain(customerOrm);
  }
}
