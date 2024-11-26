import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => VehicleORM)
  @JoinColumn()
  vehicle: VehicleORM;

  @OneToMany(() => ReviewORM, (review) => review.driver, { cascade: true })
  reviews: ReviewORM[];

  @Column('float')
  ratePerKm: number;

  @Column('float')
  minimumDistance: number;

  @OneToMany(() => ReviewORM, (ride) => ride.driver)
  rides: ReviewORM[];
}
