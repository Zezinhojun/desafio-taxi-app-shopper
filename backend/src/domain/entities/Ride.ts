import { Driver } from './Driver';
import { Location } from './Location';

export interface RideParams {
  customerId: string;
  origin: Location;
  destination: Location;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
  date: Date;
}

export class Ride {
  private readonly _customerId: string;
  private readonly _origin: Location;
  private readonly _destination: Location;
  private readonly _distance: number;
  private readonly _duration: string;
  private readonly _driver: Driver;
  private readonly _value: number;
  private readonly _date: Date;

  constructor({
    customerId,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
    date,
  }: RideParams) {
    this._customerId = customerId;
    this._origin = origin;
    this._destination = destination;
    this._distance = distance;
    this._duration = duration;
    this._driver = driver;
    this._value = value;
    this._date = date;
  }

  get driver(): Driver {
    return this._driver;
  }

  get distance() {
    return this._distance;
  }

  estimateRide(): number {
    return this._driver.calculateRideValue(this._distance);
  }
}
