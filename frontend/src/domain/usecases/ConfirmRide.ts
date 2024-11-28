import { ApiDataSource, ConfirmRideParams } from "@/data/datasources/ApiDataSoure";

export class ConfirmRideUseCase {
    constructor(
        private readonly apiDataSource: ApiDataSource
    ) { }

    async execute({ customerId, rideDetails }: ConfirmRideParams) {
        if (
            !rideDetails.origin ||
            !rideDetails.destination ||
            rideDetails.origin === rideDetails.destination
        ) {
            throw new Error('Invalid origin or destination');
        }

        return await this.apiDataSource.confirmRide(customerId, rideDetails);
    }
}