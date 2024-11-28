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

    const validateInputs = (customerId: string, origin: string, destination: string) => {
        if (!customerId || !origin || !destination) {
            return "All fields are required.";
        }
        if (origin === destination) {
            return "Origin and destination cannot be the same.";
        }
        return null;
    };


    const estimateRide = async (customerId: string, origin: string, destination: string) => {
        const validationError = validateInputs(customerId, origin, destination);
        if (validationError) {
            setError(validationError);
            return;
        }
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