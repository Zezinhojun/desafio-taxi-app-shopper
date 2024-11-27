import { Review } from './Review';
import { Vehicle } from './Vehicle';

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
  private readonly _review: Review[];

  constructor({
    id,
    name,
    description,
    vehicle,
    ratePerKm,
    minimumDistance,
    reviews: review,
  }: DriverParams) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._vehicle = vehicle;
    this._ratePerKm = ratePerKm;
    this._minimumDistance = minimumDistance;
    this._review = review;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get vehicle() {
    return this._vehicle;
  }

  get ratePerKm() {
    return this._ratePerKm;
  }

  get minimumDistance() {
    return this._minimumDistance;
  }

  get review() {
    return this._review;
  }

  calculateRideValue(distance: number): number {
    return distance * this._ratePerKm;
  }

  isEligibleForDistance(distance: number): boolean {
    return distance >= this._minimumDistance;
  }
}
