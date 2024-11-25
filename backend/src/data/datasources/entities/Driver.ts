import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReviewORM } from './Review';
import { VehicleORM } from './Vehicle';

@Entity('drivers')
export class DriverORM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('text')
  description: string;

  @OneToOne(() => VehicleORM, (vehicle) => vehicle.driver)
  vehicle: VehicleORM;

  @OneToMany(() => ReviewORM, (review) => review.driver, { cascade: true })
  reviews: ReviewORM[];

  @Column('decimal', { precision: 10, scale: 2 })
  ratePerKm: number;

  @Column('int')
  minimumDistance: number;

  @OneToMany(() => ReviewORM, (ride) => ride.driver)
  rides: ReviewORM[];
}
