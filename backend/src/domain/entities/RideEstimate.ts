import { Driver } from './Driver';
import { Location } from './Location';

export interface RideEstimateParams {
  origin: Location;
  destination: Location;
  distance: number;
  duration: string;
  availableDrivers: Driver[];
  routeResponse: object;
}

export class RideEstimate {
  private readonly _origin: Location;
  private readonly _destination: Location;
  private readonly _distance: number;
  private readonly _duration: string;
  private _availableDrivers: Driver[];
  private readonly _routeResponse: object;

  constructor({
    origin,
    destination,
    distance,
    duration,
    availableDrivers,
    routeResponse,
  }: RideEstimateParams) {
    this._origin = origin;
    this._destination = destination;
    this._distance = distance;
    this._duration = duration;
    this._availableDrivers = availableDrivers;
    this._routeResponse = routeResponse;
  }

  get distance() {
    return this._distance;
  }

  get duration() {
    return this._duration;
  }

  get availableDrivers(): Driver[] {
    return this._availableDrivers;
  }

  // Setter
  set availableDrivers(drivers: Driver[]) {
    this._availableDrivers = drivers;
  }

  listAvailableDrivers(): Driver[] {
    return this._availableDrivers
      .filter((driver) => driver.isEligibleForDistance(this._distance))
      .sort(
        (a, b) =>
          a.calculateRideValue(this._distance) -
          b.calculateRideValue(this._distance),
      );
  }
}
