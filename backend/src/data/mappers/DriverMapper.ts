import { DriverORM } from '@data/datasources/entities/Driver';
import { Driver } from '@domain/entities/Driver';
import { ReviewMapper } from './ReviewMapper';
import { Review } from '@domain/entities/Review';
import { VehicleMapper } from './VehicleMapper';
import { VehicleORM } from '@data/datasources/entities/Vehicle';
import { ReviewORM } from '@data/datasources/entities/Review';

export class DriverMapper {
  static toDomain(ormEntity: DriverORM): Driver {
    const review =
      ormEntity.reviews.length > 0
        ? ReviewMapper.toDomain(ormEntity.reviews[0])
        : new Review({
          rating: 5,
          comment: 'Very Good',
        });

    if (!ormEntity.vehicle) {
      throw new Error('DriverORM must have a Vehicle associated.');
    }

    const vehicle = VehicleMapper.toDomain(ormEntity.vehicle);

    return new Driver({
      id: ormEntity.id,
      name: ormEntity.name,
      description: ormEntity.description,
      vehicle: vehicle,
      review: review,
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

    if (domainEntity.review) {
      if (ormEntity.reviews.length > 0) {
        const review = ormEntity.reviews[0];
        review.rating = domainEntity.review.rating;
        review.comment = domainEntity.review.comment;
      } else {
        const newReview = new ReviewORM();
        newReview.rating = domainEntity.review.rating;
        newReview.comment = domainEntity.review.comment;
        ormEntity.reviews.push(newReview);
      }
    }


    ormEntity.ratePerKm = domainEntity.ratePerKm;
    ormEntity.minimumDistance = domainEntity.minimumDistance;
    return ormEntity;
  }
}
