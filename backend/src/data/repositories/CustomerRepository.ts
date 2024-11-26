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
  ) {}

  private get customerRepository(): Repository<CustomerORM> {
    return this.dataSource.getRepository(CustomerORM);
  }

  async findById(id: string): Promise<Customer | null> {
    const customerOrm = await this.customerRepository.findOne({
      where: { id },
      relations: ['rides'],
    });
    return customerOrm ? CustomerMapper.toDomain(customerOrm) : null;
  }
}
