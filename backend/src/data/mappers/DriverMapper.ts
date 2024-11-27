import { DriverORM } from '@data/datasources/entities/Driver';
import { Driver } from '@domain/entities/Driver';
import { ReviewMapper } from './ReviewMapper';
import { VehicleMapper } from './VehicleMapper';
import { VehicleORM } from '@data/datasources/entities/Vehicle';

export class DriverMapper {
  static toDomain(ormEntity: DriverORM): Driver {
    if (!ormEntity) {
      throw new Error('Invalid DriverORM object.');
    }
    if (!ormEntity.vehicle) {
      throw new Error('DriverORM must have a Vehicle associated.');
    }

    return new Driver({
      id: ormEntity.id,
      name: ormEntity.name,
      description: ormEntity.description,
      vehicle: VehicleMapper.toDomain(ormEntity.vehicle),
      reviews: Array.isArray(ormEntity.reviews)
        ? ormEntity.reviews.length > 0
          ? ormEntity.reviews.map((review) => ReviewMapper.toDomain(review))
          : []
        : ormEntity.reviews
          ? [ReviewMapper.toDomain(ormEntity.reviews)]
          : [],
      ratePerKm: ormEntity.ratePerKm,
      minimumDistance: ormEntity.minimumDistance,
    });
  }

  static toOrm(domainEntity: Driver): DriverORM {
    const ormEntity = new DriverORM();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.description = domainEntity.description;
    ormEntity.reviews = ormEntity.reviews || [];

    if (domainEntity.vehicle) {
      const vehicle = new VehicleORM();
      vehicle.id = domainEntity.vehicle.id;
      vehicle.model = domainEntity.vehicle.model;
      vehicle.description = domainEntity.vehicle.description;
      ormEntity.vehicle = vehicle;
    }

    ormEntity.reviews = domainEntity.review.map((review) =>
      ReviewMapper.toOrm(review),
    );

    ormEntity.ratePerKm = domainEntity.ratePerKm;
    ormEntity.minimumDistance = domainEntity.minimumDistance;
    return ormEntity;
  }
}
