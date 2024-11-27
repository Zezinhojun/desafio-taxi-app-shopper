import { VehicleORM } from '@data/datasources/entities/Vehicle';
import { Vehicle } from '@domain/entities/Vehicle';

export class VehicleMapper {
  static toDomain(ormEntity: VehicleORM): Vehicle {
    return new Vehicle({
      id: ormEntity.id,
      model: ormEntity.model,
    });
  }

  static toOrm(domainEntity: Vehicle): VehicleORM {
    const ormEntity = new VehicleORM();
    ormEntity.model = domainEntity.model;
    return ormEntity;
  }
}
