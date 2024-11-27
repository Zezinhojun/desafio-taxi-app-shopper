import { ApiDataSource } from "@/data/datasources/ApiDataSoure";
import { Ride } from "../models/Ride";

export class GetRideHistoryUseCase {
    constructor(
        private readonly apiDataSource: ApiDataSource
    ) { }
    async execute(customerId: string, driverId?: number): Promise<Ride[]> {
        return await this.apiDataSource.getRideHistory(customerId, driverId)
    }
}