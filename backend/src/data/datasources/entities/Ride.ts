import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerORM } from './Customer';
import { DriverORM } from './Driver';
import { Location } from '@domain/entities/Location';

@Entity('rides')
export class RideORM {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerORM, (customer) => customer.rides)
  customer: CustomerORM;

  @ManyToOne(() => DriverORM, (driver) => driver.rides)
  driver: DriverORM;

  @OneToOne(() => Location)
  @JoinColumn()
  origin: Location;

  @OneToOne(() => Location)
  @JoinColumn()
  destination: Location;

  @Column('decimal', { precision: 10, scale: 2 })
  distance: number;

  @Column('varchar')
  duration: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column('datetime')
  date: Date;
}
