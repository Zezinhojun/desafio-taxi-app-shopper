import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('locations')
export class LocationORM {
  @PrimaryColumn('varchar', { length: 255 })
  address: string;

  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitude: number;
}
