export interface LocationParams {
    address: string;
    latitude: number;
    longitude: number;
}

export class Location {
    private readonly _id?: number;
    private readonly _address: string;
    private readonly _latitude: number;
    private readonly _longitude: number;

    constructor({ address, latitude, longitude }: LocationParams) {
        this._address = address;
        this._latitude = latitude;
        this._longitude = longitude;
    }

    get id(): number | undefined {
        return this._id;
    }

    get address(): string {
        return this._address;
    }

    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    validateAddress(): boolean {
        if (!this._address || this._address.trim().length === 0) {
            return false;
        }

        if (
            this._latitude === undefined ||
            this._longitude === undefined ||
            this._latitude < -90 ||
            this._latitude > 90 ||
            this._longitude < -180 ||
            this._longitude > 180
        ) {
            return false;
        }
        return true;
    }

    toPayload(): LocationParams {
        return {
            address: this._address,
            latitude: this._latitude,
            longitude: this._longitude,
        };
    }
}
