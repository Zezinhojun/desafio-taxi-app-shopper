export interface VehicleParams {
  model: string;
  year: number;
  description: string;
}

export class Vehicle {
  private readonly _model: string;
  private readonly _year: number;
  private readonly _description: string;

  constructor({ model, year, description }: VehicleParams) {
    this._model = model;
    this._year = year;
    this._description = description;
  }
}
