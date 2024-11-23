import { GoogleMapsDataSource } from '@data/datasources/GoogleMapsDataSource';
import { Driver } from '@domain/entities/Driver';
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
  ) { }

  async execute({
    customerId,
    origin,
    destination,
  }: EstimateRideParams): Promise<RideEstimate> {
    if (!customerId || !origin || !destination || origin === destination) {
      throw new Error('INVALID_DATA');
    }

    const originLocation =
      await this.googleMapsDataSource.geocodeAddress(origin);

    const destinationLocation =
      await this.googleMapsDataSource.geocodeAddress(destination);

    const routeDetails = await this.googleMapsDataSource.calculateRote(
      originLocation,
      destinationLocation,
    );

    if (!routeDetails?.distance) {
      throw new Error('Unable to calculate route details');
    }

    const availableDrivers = await this.driverRepository.findEligibleDrivers(
      routeDetails.distance,
    );

    const mappedDrivers = availableDrivers.map((driver) => {
      return new Driver({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        ratePerKm: driver.ratePerKm,
        minimumDistance: driver.minimumDistance,
        review: driver.review,
      });
    });

    const rideEstimateParams: RideEstimateParams = {
      origin: originLocation,
      destination: destinationLocation,
      distance: routeDetails.distance,
      duration: routeDetails.duration,
      options: mappedDrivers,
      routeResponse: routeDetails.originalResponse,
    };

    return new RideEstimate(rideEstimateParams);
  }
}
