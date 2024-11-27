import { Ride } from "./Ride";

export interface CustomerParams {
    id: string;
    rideHistory: Ride[]
}

export class Customer {
    private readonly _id: string;
    private readonly _rideHistory: Ride[];

    constructor({ id, rideHistory }: CustomerParams) {
        this._id = id;
        this._rideHistory = rideHistory;
    }

    get id() {
        return this._id
    }

    get rideHistory() {
        return this._rideHistory
    }

    toPayload(): CustomerParams {
        return {
            id: this._id,
            rideHistory: this._rideHistory
        }
    }
}