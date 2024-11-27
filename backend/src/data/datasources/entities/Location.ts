import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class LocationORM {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar')
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;
}
