import { ApiDataSource } from "@/data/datasources/ApiDataSoure";
import { RideEstimate } from "../models/RideEstimate";

export class EstimateRideUseCase {
    constructor(
        private readonly apiDataSource: ApiDataSource
    ) { }

    async execute(customerId: string, origin: string, destination: string): Promise<RideEstimate> {
        return await this.apiDataSource.estimateRide(customerId, origin, destination)
    }
}