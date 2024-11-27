import { Driver, DriverParams } from "./Driver";
import { Location, LocationParams } from "./Location";

export interface RideEstimateParams {
    origin: LocationParams;
    destination: LocationParams;
    distance: number;
    duration: string;
    options: DriverParams[];
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
        this._origin = new Location(origin);
        this._destination = new Location(destination);
        this._distance = distance;
        this._duration = duration;
        this._options = availableDrivers.map(driver => new Driver(driver))
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


    toPayload(): RideEstimateParams {
        return {
            origin: this._origin.toPayload(),
            destination: this._destination.toPayload(),
            distance: this._distance,
            duration: this._duration,
            options: this.availableDrivers.map(driver => driver.toPayload()),
            routeResponse: this._routeResponse,
        }
    }

}