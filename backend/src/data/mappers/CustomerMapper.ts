import { CustomerORM } from '@data/datasources/entities/Customer';
import { Customer } from '@domain/entities/Customer';
import { RideMapper } from './RideMapper';

export class CustomMapper {
  static toDomain(ormEntity: CustomerORM): Customer {
    return new Customer({
      id: ormEntity.id,
      rideHistory: ormEntity.rides.map((ride) => RideMapper.toDomain(ride)),
    });
  }

  static toOrm(domainEntity: Customer): CustomerORM {
    const ormEntity = new CustomerORM();
    ormEntity.id = domainEntity.id;
    ormEntity.rides = domainEntity.rideHistory.map((ride) =>
      RideMapper.toOrm(ride),
    );
    return ormEntity;
  }
}
