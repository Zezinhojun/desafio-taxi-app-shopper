import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DriverORM } from './Driver';
import { CustomerORM } from './Customer';

@Entity('reviews')
export class ReviewORM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float', { nullable: false })
  rating: number;

  @Column('text', { nullable: true })
  comment: string;

  @ManyToOne(() => DriverORM, driver => driver.reviews)
  @JoinColumn({ name: 'driverId' })
  driver: DriverORM

  @ManyToOne(() => CustomerORM, customer => customer.rides)
  @JoinColumn({ name: 'customerId' })
  customer: DriverORM


  @ManyToOne(() => DriverORM, (driver) => driver.reviews, {
    onDelete: 'CASCADE',
  })

  @CreateDateColumn()
  date: Date
}
