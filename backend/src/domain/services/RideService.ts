import { Ride } from '@domain/entities/Ride';
import { RideEstimate } from '@domain/entities/RideEstimate';
import { ConfirmRideUseCase } from '@domain/usecase/ConfirmRideUserCase';
import { EstimateRideUseCase } from '@domain/usecase/EstimateRideUseCase';

export interface EstimateRideParams {
  customerId: string;
  origin: string;
  destination: string;
}

export interface ConfirmRideParams {
  customerId: string;
  rideDetails: Ride;
}

export class RideService {
  constructor(
    private readonly confirmRideUseCase: ConfirmRideUseCase,
    private readonly estimateRideUseCase: EstimateRideUseCase,
  ) {}

  async estimateRide({
    customerId,
    origin,
    destination,
  }: EstimateRideParams): Promise<RideEstimate> {
    const params = { customerId, origin, destination };
    return this.estimateRideUseCase.execute(params);
  }

  async confirmRide(customerId: string, rideDetails: Ride): Promise<Ride> {
    return this.confirmRideUseCase.execute(customerId, rideDetails);
  }
}
