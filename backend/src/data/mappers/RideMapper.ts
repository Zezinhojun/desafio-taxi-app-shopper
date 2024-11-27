import { RideORM } from '@data/datasources/entities/Ride';
import { Ride } from '@domain/entities/Ride';
import { DriverMapper } from './DriverMapper';
import { LocationMapper } from './LocationMapper';
import { CustomerORM } from '@data/datasources/entities/Customer';

export class RideMapper {
  static toDomain(ormEntity: RideORM): Ride {
    return new Ride({
      id: ormEntity.id,
      customerId: ormEntity.customer.id,
      driver: DriverMapper.toDomain(ormEntity.driver),
      origin: LocationMapper.toDomain(ormEntity.origin),
      destination: LocationMapper.toDomain(ormEntity.destination),
      distance: ormEntity.distance,
      duration: ormEntity.duration,
      value: ormEntity.value,
      date: ormEntity.createdAt,
    });
  }

  static toOrm(domainEntity: Ride): RideORM {
    const ormEntity = new RideORM();
    const customerORM = new CustomerORM();
    ormEntity.id = domainEntity.id;
    ormEntity.customer = customerORM;
    ormEntity.driver = DriverMapper.toOrm(domainEntity.driver);
    ormEntity.origin = LocationMapper.toOrm(domainEntity.origin);
    ormEntity.destination = LocationMapper.toOrm(domainEntity.destination);
    ormEntity.distance = domainEntity.distance;
    ormEntity.duration = domainEntity.duration;
    ormEntity.value = domainEntity.value;
    ormEntity.createdAt = domainEntity.date;

    return ormEntity;
  }
}
