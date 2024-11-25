export interface VehicleParams {
  id: string;
  model: string;
  description: string;
}

export class Vehicle {
  private readonly _id: string;
  private readonly _model: string;
  private readonly _description: string;

  constructor({ id, model, description }: VehicleParams) {
    this._id = id;
    this._model = model;
    this._description = description;
  }

  get id(): string {
    return this._id;
  }

  get model(): string {
    return this._model;
  }

  get description(): string {
    return this._description;
  }
}
