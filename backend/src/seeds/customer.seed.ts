import { CustomerORM } from '@data/datasources/entities/Customer';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';

@injectable()
export class CustomerSeedService {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) { }

  async seedCustomer() {
    const customerRepository = this.dataSource.getRepository(CustomerORM);

    const existingCustomerCount = await customerRepository.count();
    if (existingCustomerCount >= 3) {
      return;
    }

    const customersData = [
      {
        id: '1',
        rideHistory: [],
      },
      {
        id: '2',
        rideHistory: [],
      },
      {
        id: '3',
        rideHistory: [],
      },
      {
        id: '4',
        rideHistory: [],
      },
      {
        id: '5',
        rideHistory: [],
      },
    ];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const customerData of customersData) {
        const customer = new CustomerORM();
        customer.id = customerData.id;
        customer.rides = customerData.rideHistory;

        await queryRunner.manager.save(customer);
      }
      await queryRunner.commitTransaction();
      console.log('Customer seed executado com sucesso!');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Erro ao executar seed de drivers:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
