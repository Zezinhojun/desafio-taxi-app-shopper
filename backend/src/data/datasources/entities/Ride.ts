import {
  Column,
  CreateDateColumn,
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

  @ManyToOne(() => CustomerORM)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerORM;

  @ManyToOne(() => DriverORM)
  @JoinColumn({ name: 'driverId' })
  driver: DriverORM;

  @OneToOne(() => LocationORM)
  @JoinColumn({ name: 'originId' })
  origin: LocationORM;

  @OneToOne(() => LocationORM)
  @JoinColumn({ name: 'destinationId' })
  destination: LocationORM;

  @Column('float')
  distance: number;

  @Column('varchar')
  duration: string;

  @Column('float')
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}
