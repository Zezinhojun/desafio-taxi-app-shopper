import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DriverORM } from './Driver';

@Entity('vehicles')
export class VehicleORM {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => DriverORM, (driver) => driver.vehicle, { cascade: true })
  @JoinColumn()
  driver: DriverORM;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'text' })
  description: string;
}
