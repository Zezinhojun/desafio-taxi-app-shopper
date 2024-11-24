export interface ReviewParams {
  rating: number;
  comment: string;
}

export class Review {
  private readonly _rating: number;
  private readonly _comment: string;

  constructor({ rating, comment }: ReviewParams) {
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
