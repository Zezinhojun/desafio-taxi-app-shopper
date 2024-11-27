export interface VehicleParams {
  id: string;
  model: string;
}

export class Vehicle {
  private readonly _id: string;
  private readonly _model: string;

  constructor({ id, model }: VehicleParams) {
    this._id = id;
    this._model = model;
  }

  get id(): string {
    return this._id;
  }

  get model(): string {
    return this._model;
  }
}
