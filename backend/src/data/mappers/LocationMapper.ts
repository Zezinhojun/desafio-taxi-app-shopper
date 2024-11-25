import { LocationORM } from '@data/datasources/entities/Location';
import { Location } from '@domain/entities/Location';

export class LocationMapper {
  static toDomain(ormEntity: LocationORM): Location {
    return new Location({
      address: ormEntity.address,
      latitude: ormEntity.latitude,
      longitude: ormEntity.longitude,
    });
  }

  static toOrm(domainEntity: Location): LocationORM {
    const ormEntity = new LocationORM();
    ormEntity.address = domainEntity.address;
    ormEntity.latitude = domainEntity.latitude;
    ormEntity.longitude = domainEntity.longitude;
    return ormEntity;
  }
}
