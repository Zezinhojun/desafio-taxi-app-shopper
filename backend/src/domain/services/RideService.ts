import { GetRideHistoryUseCase } from './../usecase/GetRideHistoryUseCase';
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
    private readonly getRideHistoryUseCase: GetRideHistoryUseCase,
  ) {}

  async estimateRide({
    customerId,
    origin,
    destination,
  }: EstimateRideParams): Promise<RideEstimate> {
    const params = { customerId, origin, destination };
    return this.estimateRideUseCase.execute(params);
  }

  async confirmRide({
    customerId,
    rideDetails,
  }: ConfirmRideParams): Promise<Ride> {
    const params = { customerId, rideDetails };
    return this.confirmRideUseCase.execute(params);
  }

  async getRideHistory(customerId: string): Promise<Ride[]> {
    return await this.getRideHistoryUseCase.execute(customerId);
  }
}
