export interface VehicleParams {
  model: string;
  description: string;
}

export class Vehicle {
  private readonly _model: string;
  private readonly _description: string;

  constructor({ model, description }: VehicleParams) {
    this._model = model;
    this._description = description;
  }

  get model() {
    return this._model;
  }

  get description() {
    return this._description;
  }
}
