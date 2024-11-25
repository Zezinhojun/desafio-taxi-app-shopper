import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Driver } from "./Driver";
import { Location } from "@domain/entities/Location";

@Entity('rides')
export class Ride {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, customer => customer.rides)
    customer: Customer

    @ManyToOne(() => Driver, driver => driver.rides)
    driver: Driver

    @OneToOne(() => Location)
    @JoinColumn()
    origin: Location

    @OneToOne(() => Location)
    @JoinColumn()
    destination: Location

    @Column('decimal', { precision: 10, scale: 2 })
    distance: number;

    @Column()
    duration: string

    @Column('decimal', { precision: 10, scale: 2 })
    value: number;

    @Column('datetime')
    date: Date;
}