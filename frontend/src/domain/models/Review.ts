export interface ReviewParams {
    id?: number;
    rating: number;
    comment: string
}

export class Review {
    private readonly _id?: number;
    private readonly _rating: number;
    private readonly _comment: string;

    constructor({ id, rating, comment }: ReviewParams) {
        if (id) {
            this._id = id;
        }
        this._rating = rating;
        this._comment = comment
    }

    get rating(): number {
        return this._rating;
    }

    get comment(): string {
        return this._comment;
    }

    get id(): number | undefined {
        return this._id;
    }

    toPayload(): ReviewParams {
        return {
            id: this._id,
            rating: this._rating,
            comment: this._comment,
        };
    }
}
