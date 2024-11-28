import { Ride } from '@/domain/models/Ride';
import { RideEstimate } from '@/domain/models/RideEstimate';
import { RideResponseParams } from '@/domain/models/RideResponse';
import axios from 'axios'

export interface ConfirmRideParams {
    customerId: string;
    rideDetails: Ride;
}

export class ApiDataSource {
    async getRideHistory(customerId: string, driverId?: number): Promise<RideResponseParams> {
        const response = await axios.get(`http://localhost:8080/rides/history/${customerId}`, {
            params: { driverId },
        });

        return response.data;
    }

    async estimateRide(customerId: string, origin: string, destination: string): Promise<RideEstimate> {
        try {
            const response = await axios.post("http://localhost:8080/rides/estimate", {
                customer_id: customerId,
                origin,
                destination,
            });

            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new Error("Failed to estimate the ride. Please try again.");
        }
    }

    async confirmRide(customerId: string, rideDetails: Ride): Promise<Ride> {
        const response = await axios.post("http://localhost:8080/rides/confirm", { customerId, rideDetails });
        return response.data;
    }
}