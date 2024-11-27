import { Ride } from "./Ride";

export interface RideResponseParams {
    customerId: string;
    rides: Ride[];
}

export class RideResponse {
    private readonly _customerId: string;
    private readonly _rides: Ride[];

    constructor({ customerId, rides }: RideResponseParams) {
        this._customerId = customerId;
        this._rides = rides;
    }

    get customerId(): string {
        return this._customerId;
    }

    get rides(): Ride[] {
        return this._rides;
    }
}
