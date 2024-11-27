import { ApiDataSource } from "@/data/datasources/ApiDataSoure";
import { RideEstimate } from "@/domain/models/RideEstimate";
import { EstimateRideUseCase } from "@/domain/usecases/EstimateRide";
import { useState } from "react";

const rideDataSource = new ApiDataSource();
const estimateRideUseCase = new EstimateRideUseCase(rideDataSource);

export function useEstimateRide() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rideEstimate, setRideEstimate] = useState<RideEstimate | null>(null);


    const estimateRide = async (customerId: string, origin: string, destination: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const estimate = await estimateRideUseCase.execute(customerId, origin, destination)
            setRideEstimate(estimate)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError("Unable to estimate the ride. Please try again.");
        }
        finally {
            setIsLoading(false)
        }
    }

    return { estimateRide, rideEstimate, isLoading, error };

}