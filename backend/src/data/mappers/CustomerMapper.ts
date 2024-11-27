import { CustomerORM } from '@data/datasources/entities/Customer';
import { Customer } from '@domain/entities/Customer';
import { RideMapper } from './RideMapper';

export class CustomerMapper {
  static toDomain(ormEntity: CustomerORM): Customer {
    const rideHistory = ormEntity.rides
      ? ormEntity.rides.map((ride) => {
        return RideMapper.toDomain(ride);
      })
      : [];

    return new Customer({
      id: ormEntity.id,
      rideHistory: rideHistory,
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
