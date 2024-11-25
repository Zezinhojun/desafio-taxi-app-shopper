import { DriverORM } from '@data/datasources/entities/Driver';
import { Driver } from '@domain/entities/Driver';
import { Review } from '@domain/entities/Review';
import { Vehicle } from '@domain/entities/Vehicle';

export class DriverMapper {
  static toDomain(ormEntity: DriverORM): Driver {
    return new Driver({
      id: ormEntity.id,
      name: ormEntity.name,
      description: ormEntity.description,
      vehicle: new Vehicle({
        model: ormEntity.vehicle.model,
        description: ormEntity.vehicle.description,
      }),
      review: new Review({
        rating: ormEntity.review.rating,
        comment: ormEntity.review.comment,
      }),
      ratePerKm: ormEntity.ratePerKm,
      minimumDistance: ormEntity.minimumDistance,
    });
  }

  static toOrm(domainEntity: Driver): DriverORM {
    const ormEntity = new DriverORM();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.description = domainEntity.description;
    ormEntity.vehicle = new Vehicle({
      model: domainEntity.vehicle.model,
      description: domainEntity.vehicle.description,
    });
    ormEntity.review = new Review({
      rating: domainEntity.review.rating,
      comment: domainEntity.review.comment,
    });
    ormEntity.ratePerKm = domainEntity.ratePerKm;
    ormEntity.minimumDistance = domainEntity.minimumDistance;
    return ormEntity;
  }
}
