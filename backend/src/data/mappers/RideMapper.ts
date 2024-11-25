import { RideORM } from '@data/datasources/entities/Ride';
import { Location } from '@domain/entities/Location';
import { Ride } from '@domain/entities/Ride';
import { DriverMapper } from './DriverMapper';

export class RideMapper {
  static toDomain(ormEntity: RideORM): Ride {
    return new Ride({
      id: ormEntity.id,
      customerId: ormEntity.customer.id,
      origin: new Location({
        address: ormEntity.origin.address,
        latitude: ormEntity.origin.latitude,
        longitude: ormEntity.origin.longitude,
      }),
      destination: new Location({
        address: ormEntity.destination.address,
        latitude: ormEntity.destination.latitude,
        longitude: ormEntity.destination.longitude,
      }),
      distance: ormEntity.distance,
      duration: ormEntity.duration,
      driver: DriverMapper.toDomain(ormEntity.driver),
      value: ormEntity.value,
      date: ormEntity.date,
    });
  }

  static toOrm(domainEntity: Ride): RideORM {
    const ormEntity = new RideORM();
    ormEntity.id = domainEntity.id;
    ormEntity.customer.id = domainEntity.customerId;
    ormEntity.origin = {
      address: domainEntity.origin.address,
      latitude: domainEntity.origin.latitude,
      longitude: domainEntity.origin.longitude,
    };
    ormEntity.destination = {
      address: domainEntity.destination.address,
      latitude: domainEntity.destination.latitude,
      longitude: domainEntity.destination.longitude,
    };
    ormEntity.distance = domainEntity.distance;
    ormEntity.duration = domainEntity.duration;
    ormEntity.driver = DriverMapper.toOrm(domainEntity.driver);
    ormEntity.value = domainEntity.value;
    ormEntity.date = domainEntity.date;
    return ormEntity;
  }
}
