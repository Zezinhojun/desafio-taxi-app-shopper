import { ApiDataSource } from "@/data/datasources/ApiDataSoure";
import { Ride } from "@/domain/models/Ride";
import { GetRideHistoryUseCase } from "@/domain/usecases/GetRideHistory";
import { useEffect, useState } from "react";

type useGetRideHistoryParams = { rides: Ride[]; error: string | null }

export function useGetRideHistory(customerId: string, driverId?: number): useGetRideHistoryParams {
    const [rides, setRides] = useState<Ride[]>([]);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const apiDataSource = new ApiDataSource();
                const useCase = new GetRideHistoryUseCase(apiDataSource)
                const rideHistory = await useCase.execute(customerId, driverId);
                setRides(rideHistory)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setError("Unable to getHistory the ride. Please try again.");
            }
        }
        fetchRides();
    }, [customerId, driverId])

    return { rides, error };
}
