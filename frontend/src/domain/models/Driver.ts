import { Review } from "./Review";
import { Vehicle } from "./Vehicle";

export interface DriverParams {
    id: number;
    name: string;
    description: string;
    vehicle: Vehicle;
    ratePerKm: number;
    minimumDistance: number;
    reviews: Review[];
}

export class Driver {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _vehicle: Vehicle;
    private readonly _ratePerKm: number;
    private readonly _minimumDistance: number;
    private readonly _reviews: Review[];

    constructor({
        id,
        name,
        description,
        vehicle,
        ratePerKm,
        minimumDistance,
        reviews,
    }: DriverParams) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._vehicle = vehicle;
        this._ratePerKm = ratePerKm;
        this._minimumDistance = minimumDistance;
        this._reviews = reviews
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get vehicle(): Vehicle {
        return this._vehicle;
    }

    get ratePerKm(): number {
        return this._ratePerKm;
    }

    get minimumDistance(): number {
        return this._minimumDistance;
    }

    get reviews(): Review[] {
        return this._reviews;
    }

    calculateRideValue(distance: number): number {
        return distance * this._ratePerKm;
    }

}