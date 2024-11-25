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
import { LocationORM } from './Location';

@Entity('rides')
export class RideORM {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerORM, (customer) => customer.rides)
  customer: CustomerORM;

  @ManyToOne(() => DriverORM, (driver) => driver.rides)
  driver: DriverORM;

  @OneToOne(() => LocationORM)
  @JoinColumn()
  origin: LocationORM;

  @OneToOne(() => LocationORM)
  @JoinColumn()
  destination: LocationORM;

  @Column('decimal', { precision: 10, scale: 2 })
  distance: number;

  @Column('varchar')
  duration: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column('datetime')
  date: Date;
}
