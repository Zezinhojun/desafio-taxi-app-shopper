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

export interface RideEstimateDTO {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
  options: RideOptionDTO[];
  routeResponse: object;
}

export interface RideOptionDTO {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: { rating: number; comment: string };
  value: number;
}

export interface RideHistoryDTO {
  customer_id: string;
  rides: RideDTO[];
}

export interface RideDTO {
  id?: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export class RideService {
  constructor(
    private readonly confirmRideUseCase: ConfirmRideUseCase,
    private readonly estimateRideUseCase: EstimateRideUseCase,
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
          rating: driver.review.rating,
          comment: driver.review.comment,
        },
        value: driver.calculateRideValue(estimate.distance),
      })),
      routeResponse: estimate.routeResponse,
    };
  }

  private mapToRideDTO(ride: Ride): RideDTO {
    return {
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

  async getRideHistory(customerId: string): Promise<RideHistoryDTO> {
    const rides = await this.getRideHistoryUseCase.execute(customerId);
    return {
      customer_id: customerId,
      rides: rides.map((ride) => this.mapToRideDTO(ride)),
    };
  }
}
