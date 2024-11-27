import { Driver } from "./Driver";
import { Location } from "./Location";

export interface RideEstimateParams {
    origin: Location;
    destination: Location;
    distance: number;
    duration: string;
    options: Driver[];
    routeResponse: object;
}

export class RideEstimate {
    private readonly _origin: Location;
    private readonly _destination: Location;
    private readonly _distance: number;
    private readonly _duration: string;
    private readonly _options: Driver[];
    private readonly _routeResponse: object;

    constructor({
        origin,
        destination,
        distance,
        duration,
        options: availableDrivers,
        routeResponse,
    }: RideEstimateParams) {
        this._origin = origin;
        this._destination = destination;
        this._distance = distance;
        this._duration = duration;
        this._options = availableDrivers
        this._routeResponse = routeResponse;
    }

    get origin() {
        return this._origin;
    }

    get destination() {
        return this._destination;
    }

    get distance() {
        return this._distance;
    }

    get duration() {
        return this._duration;
    }

    get routeResponse() {
        return this._routeResponse;
    }

    get availableDrivers(): Driver[] {
        return this._options;
    }

}