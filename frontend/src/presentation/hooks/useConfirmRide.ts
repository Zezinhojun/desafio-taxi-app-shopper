import { ApiDataSource } from '@/data/datasources/ApiDataSoure';
import { Ride } from '@/domain/models/Ride';
import { ConfirmRideUseCase } from '@/domain/usecases/ConfirmRide';
import { useState } from 'react';

type UseConfirmRideResult = {
    confirmRide: (customerId: string, rideDetails: Ride) => Promise<void>;
    error: string | null;
    isLoading: boolean;
};

export function useConfirmRide(): UseConfirmRideResult {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const confirmRide = async (customerId: string, rideDetails: Ride): Promise<void> => {
        setIsLoading(true);
        try {
            const apiDataSource = new ApiDataSource();
            const useCase = new ConfirmRideUseCase(apiDataSource);

            await useCase.execute({ customerId, rideDetails });
            setIsLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setIsLoading(false);
            setError('Unable to confirm the ride. Please try again.');
        }
    };

    return { confirmRide, error, isLoading };
}
