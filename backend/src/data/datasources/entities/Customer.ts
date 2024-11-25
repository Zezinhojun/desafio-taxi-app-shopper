
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ride } from "./Ride";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => Ride, ride => ride.customer)
    rides: Ride[]
}