import { Driver } from './Driver';
import { Location } from './Location';

export interface RideParams {
  id?: number;
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
  private readonly _id: number;
  private readonly _customerId: string;
  private readonly _origin: Location;
  private readonly _destination: Location;
  private readonly _distance: number;
  private readonly _duration: string;
  private readonly _driver: Driver;
  private readonly _value: number;
  private readonly _date: Date;

  constructor({
    id,
    customerId,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
    date,
  }: RideParams) {
    this._id = id || Ride.generateId();
    this._customerId = customerId;
    this._origin = origin;
    this._destination = destination;
    this._distance = distance;
    this._duration = duration;
    this._driver = driver;
    this._value = value;
    this._date = date;
  }

  get id(): number {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get origin(): Location {
    return this._origin;
  }

  get destination(): Location {
    return this._destination;
  }

  get driver(): Driver {
    return this._driver;
  }

  get distance(): number {
    return this._distance;
  }

  get duration(): string {
    return this._duration;
  }

  get value(): number {
    return this._value;
  }

  get date(): Date {
    return this._date;
  }

  estimateRide(): number {
    return this._driver.calculateRideValue(this._distance);
  }

  private static generateId(): number {
    const uuid = crypto.randomUUID();
    const numericId = parseInt(uuid.replace(/\D/g, '').slice(0, 7), 10);
    return numericId;
  }
}
