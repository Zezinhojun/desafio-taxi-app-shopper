import { LocationORM } from '@data/datasources/entities/Location';
import { Location } from '@domain/entities/Location';

export class LocationMapper {
  static toDomain(ormEntity: LocationORM): Location {
    if (!ormEntity) {
      throw new Error('Invalid LocationORM object.');
    }
    return new Location({
      address: ormEntity.address,
      latitude: ormEntity.latitude,
      longitude: ormEntity.longitude,
    });
  }

  static toOrm(domainEntity: Location): LocationORM {
    if (!domainEntity) {
      throw new Error('Invalid Location object.');
    }
    const ormEntity = new LocationORM();
    ormEntity.address = domainEntity.address;
    ormEntity.latitude = domainEntity.latitude;
    ormEntity.longitude = domainEntity.longitude;
    return ormEntity;
  }
}
