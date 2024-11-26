import {
  Column,
  Entity,

  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('vehicles')
export class VehicleORM {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'text' })
  description: string;
}
