import { GoogleMapsDataSource } from '@data/datasources/GoogleMapsDataSource';
import {
  RideEstimate,
  RideEstimateParams,
} from '@domain/entities/RideEstimate';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';

export interface EstimateRideParams {
  customerId: string;
  origin: string;
  destination: string;
}

export class EstimateRideUseCase {
  constructor(
    private readonly driverRepository: IDriverRepository,
    private readonly googleMapsDataSource: GoogleMapsDataSource,
  ) {}

  async execute({
    customerId,
    origin,
    destination,
  }: EstimateRideParams): Promise<RideEstimate> {
    if (!customerId || !origin || !destination || origin === destination) {
      throw new Error('Invalid ride parameters');
    }

    const originLocation =
      await this.googleMapsDataSource.geocodeAddress(origin);

    const destinationLocation =
      await this.googleMapsDataSource.geocodeAddress(destination);

    const routeDetails = await this.googleMapsDataSource.calculateRote(
      originLocation,
      destinationLocation,
    );

    if (!routeDetails || routeDetails.distance === undefined) {
      throw new Error('Unable to calculate route details');
    }

    const availableDrivers = await this.driverRepository.findEligibleDrivers(
      routeDetails.distance,
    );

    const rideEstimateParams: RideEstimateParams = {
      origin: originLocation,
      destination: destinationLocation,
      distance: routeDetails.distance,
      duration: routeDetails.duration,
      availableDrivers: availableDrivers,
      routeResponse: routeDetails.originalResponse,
    };

    return new RideEstimate(rideEstimateParams);
  }
}
