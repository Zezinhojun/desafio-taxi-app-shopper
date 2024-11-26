import { DriverORM } from '@data/datasources/entities/Driver';
import { Driver } from '@domain/entities/Driver';
import { ReviewMapper } from './ReviewMapper';
import { ReviewORM } from '@data/datasources/entities/Review';
import { Review } from '@domain/entities/Review';
import { VehicleMapper } from './VehicleMapper';

export class DriverMapper {
  static toDomain(ormEntity: DriverORM): Driver {
    console.log(
      'DriverMapper - Mapeando driver:',
      JSON.stringify(ormEntity, null, 2),
    );

    // Log detalhado de cada propriedade
    console.log('Vehicle:', ormEntity.vehicle);
    console.log('Reviews:', ormEntity.reviews);

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
    if (domainEntity.vehicle) {
      ormEntity.vehicle = {
        id: domainEntity.vehicle.id,
        model: domainEntity.vehicle.model,
        description: domainEntity.vehicle.description,
        driver: ormEntity,
      };
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
