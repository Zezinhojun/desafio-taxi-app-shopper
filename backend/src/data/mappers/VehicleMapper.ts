import { VehicleORM } from '@data/datasources/entities/Vehicle';
import { Vehicle } from '@domain/entities/Vehicle';

export class VehicleMapper {
  static toDomain(ormEntity: VehicleORM): Vehicle {
    return new Vehicle({
      id: ormEntity.id,
      model: ormEntity.model,
      description: ormEntity.description,
    });
  }

  static toOrm(domainEntity: Vehicle): VehicleORM {
    const ormEntity = new VehicleORM();
    ormEntity.model = domainEntity.model;
    ormEntity.description = domainEntity.description;
    return ormEntity;
  }
}
