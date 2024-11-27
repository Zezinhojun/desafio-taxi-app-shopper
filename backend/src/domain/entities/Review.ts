export interface ReviewParams {
  id: number;
  rating: number;
  comment: string;
}

export class Review {
  private readonly _id: number;
  private readonly _rating: number;
  private readonly _comment: string;

  constructor({ id, rating, comment }: ReviewParams) {
    this._id = id;
    this._rating = rating;
    this._comment = comment;
  }

  get rating() {
    return this._rating;
  }

  get comment() {
    return this._comment;
  }
}
