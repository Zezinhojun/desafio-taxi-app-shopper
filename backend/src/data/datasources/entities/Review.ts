import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DriverORM } from './Driver';

@Entity('reviews')
export class ReviewORM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;

  @Column('text')
  comment: string;

  @ManyToOne(() => DriverORM, (driver) => driver.reviews, {
    onDelete: 'CASCADE',
  })
  driver: DriverORM;
}
