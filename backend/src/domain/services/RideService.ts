import { GetRideHistoryUseCase } from './../usecase/GetRideHistoryUseCase';
import { Ride } from '@domain/entities/Ride';
import { RideEstimate } from '@domain/entities/RideEstimate';
import { ConfirmRideUseCase } from '@domain/usecase/ConfirmRideUserCase';
import { EstimateRideUseCase } from '@domain/usecase/EstimateRideUseCase';
import { RideEstimateDTO, RideDTO, RideHistoryDTO } from './dto/RideDTO';
import { inject, injectable } from 'inversify';
import { TYPES } from '@shared/di/Types';

export interface EstimateRideParams {
  customerId: string;
  origin: string;
  destination: string;
}

export interface ConfirmRideParams {
  customerId: string;
  rideDetails: Ride;
}

@injectable()
export class RideService {
  constructor(
    @inject(TYPES.ConfirmRideUseCase)
    private readonly confirmRideUseCase: ConfirmRideUseCase,
    @inject(TYPES.EstimateRideUseCase)
    private readonly estimateRideUseCase: EstimateRideUseCase,
    @inject(TYPES.GetRideHistoryUseCase)
    private readonly getRideHistoryUseCase: GetRideHistoryUseCase,
  ) {}

  private mapToRideEstimateDTO(estimate: RideEstimate): RideEstimateDTO {
    const availableDrivers = estimate.listAvailableDrivers();

    return {
      origin: {
        latitude: estimate.origin.latitude,
        longitude: estimate.origin.longitude,
      },
      destination: {
        latitude: estimate.destination.latitude,
        longitude: estimate.destination.longitude,
      },
      distance: estimate.distance,
      duration: estimate.duration,
      options: availableDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle.model,
        review: {
          rating: driver.review[0].rating,
          comment: driver.review[0].comment,
        },
        value: driver.calculateRideValue(estimate.distance),
      })),
      routeResponse: estimate.routeResponse,
    };
  }

  private mapToRideDTO(ride: Ride): RideDTO {
    return {
      id: ride.id,
      date: ride.date,
      origin: ride.origin.address,
      destination: ride.destination.address,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    };
  }

  async estimateRide({
    customerId,
    origin,
    destination,
  }: EstimateRideParams): Promise<RideEstimateDTO> {
    const params = { customerId, origin, destination };
    const estimate = await this.estimateRideUseCase.execute(params);
    return this.mapToRideEstimateDTO(estimate);
  }

  async confirmRide({
    customerId,
    rideDetails,
  }: ConfirmRideParams): Promise<RideDTO> {
    const params = { customerId, rideDetails };

    const confirmedRide = await this.confirmRideUseCase.execute(params);
    return this.mapToRideDTO(confirmedRide);
  }

  async getRideHistory(
    customerId: string,
    driverId?: number,
  ): Promise<RideHistoryDTO> {
    const rides = await this.getRideHistoryUseCase.execute(
      customerId,
      driverId,
    );
    return {
      customer_id: customerId,
      rides: rides.map((ride) => this.mapToRideDTO(ride)),
    };
  }
}
