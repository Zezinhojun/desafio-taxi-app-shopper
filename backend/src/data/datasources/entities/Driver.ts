import { Review } from '@domain/entities/Review';
import { Ride } from '@domain/entities/Ride';
import { Vehicle } from '@domain/entities/Vehicle';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('drivers')
export class DriverORM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;

  @OneToOne(() => Review)
  @JoinColumn()
  review: Review;

  @Column('decimal', { precision: 10, scale: 2 })
  ratePerKm: number;

  @Column('int')
  minimumDistance: number;

  @OneToMany(() => Ride, (ride) => ride.driver)
  rides: Ride[];
}
