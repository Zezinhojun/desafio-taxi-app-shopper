import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RideORM } from './Ride';

@Entity('customers')
export class CustomerORM {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => RideORM, (ride) => ride.customer)
  rides: RideORM[];
}
