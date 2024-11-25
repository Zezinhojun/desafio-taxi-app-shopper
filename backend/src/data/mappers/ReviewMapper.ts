import { ReviewORM } from '@data/datasources/entities/Review';
import { Review } from '@domain/entities/Review';

export class ReviewMapper {
  static toDomain(ormEntity: ReviewORM): Review {
    return new Review({
      rating: ormEntity.rating,
      comment: ormEntity.comment,
    });
  }

  static toOrm(domainEntity: Review): ReviewORM {
    const ormEntity = new ReviewORM();
    ormEntity.rating = domainEntity.rating;
    ormEntity.comment = domainEntity.comment;
    return ormEntity;
  }
}
