import { Vehicle } from './Vehicle';

export interface DriverParams {
  id: number;
  name: string;
  description: string;
  vehicle: Vehicle;
  ratePerKm: number;
  minimunDistance: number;
}

export class Driver {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _vehicle: Vehicle;
  private readonly _ratePerKm: number;
  private readonly _minimunDistance: number;

  constructor({
    id,
    name,
    description,
    vehicle,
    ratePerKm,
    minimunDistance,
  }: DriverParams) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._vehicle = vehicle;
    this._ratePerKm = ratePerKm;
    this._minimunDistance = minimunDistance;
  }

  get id() {
    return this._id;
  }

  get ratePerKm() {
    return this._ratePerKm;
  }

  calculateRideValue(distance: number): number {
    return distance * this._ratePerKm;
  }

  isEligibleForDistance(distance: number): boolean {
    return distance >= this._minimunDistance;
  }
}
