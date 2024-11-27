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
        const response = await axios.post("/api/estimate-ride", { customerId, origin, destination });
        return response.data;
    }

    async confirmRide(customerId: string, rideDetails: Ride): Promise<Ride> {
        const response = await axios.post("/api/confirm-ride", { customerId, rideDetails });
        return response.data;
    }
}