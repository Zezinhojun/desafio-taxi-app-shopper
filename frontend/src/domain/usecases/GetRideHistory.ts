import { ApiDataSource } from "@/data/datasources/ApiDataSoure";
import { RideResponseParams } from "../models/RideResponse";

export class GetRideHistoryUseCase {
    constructor(
        private readonly apiDataSource: ApiDataSource
    ) { }
    async execute(customerId: string, driverId?: number): Promise<RideResponseParams> {
        return await this.apiDataSource.getRideHistory(customerId, driverId)
    }
}