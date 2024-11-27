import { GoogleMapsDataSource } from '@data/datasources/GoogleMapsDataSource';
import { Driver } from '@domain/entities/Driver';
import {
  RideEstimate,
  RideEstimateParams,
} from '@domain/entities/RideEstimate';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { TYPES } from '@shared/di/Types';
import { inject } from 'inversify';

export interface EstimateRideParams {
  customerId: string;
  origin: string;
  destination: string;
}

export class EstimateRideUseCase {
  constructor(
    @inject(TYPES.DriverRepository)
    private readonly driverRepository: IDriverRepository,
    @inject(TYPES.GoogleMapsDataSource)
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

    const responseGoogle = await this.googleMapsDataSource.calculateRoute(
      originLocation,
      destinationLocation,
    );

    if (!responseGoogle?.distance) {
      throw new Error('Unable to calculate route details');
    }

    const availableDrivers = await this.driverRepository.findEligibleDrivers(
      responseGoogle.distance,
    );

    const mappedDrivers = availableDrivers.map((driver) => {
      return new Driver({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        ratePerKm: driver.ratePerKm,
        minimumDistance: driver.minimumDistance,
        reviews: driver.review,
      });
    });

    const rideEstimateParams: RideEstimateParams = {
      origin: originLocation,
      destination: destinationLocation,
      distance: responseGoogle.distance,
      duration: responseGoogle.duration,
      options: mappedDrivers,
      routeResponse: responseGoogle.originalResponse,
    };

    return new RideEstimate(rideEstimateParams);
  }
}
