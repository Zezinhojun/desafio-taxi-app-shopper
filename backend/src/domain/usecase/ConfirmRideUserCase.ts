import { GoogleMapsDataSource } from '@data/datasources/GoogleMapsDataSource';
import { Location } from '@domain/entities/Location';
import { Ride, RideParams } from '@domain/entities/Ride';
import { IDriverRepository } from '@domain/interfaces/IDriverRepository';
import { IRideRepository } from '@domain/interfaces/IRideRepository';
import { ConfirmRideParams } from '@domain/services/RideService';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';

@injectable()
export class ConfirmRideUseCase {
  constructor(
    @inject(TYPES.RideRepository)
    private readonly rideRepository: IRideRepository,
    @inject(TYPES.DriverRepository)
    private readonly driverRepository: IDriverRepository,
    @inject(TYPES.GoogleMapsDataSource)
    private readonly googleMapsDataSource: GoogleMapsDataSource,
  ) {}

  async execute({ customerId, rideDetails }: ConfirmRideParams): Promise<Ride> {
    if (
      !rideDetails.origin ||
      !rideDetails.destination ||
      rideDetails.origin === rideDetails.destination
    ) {
      throw new Error('Invalid origin or destination');
    }

    const originAddress =
      typeof rideDetails.origin === 'string'
        ? rideDetails.origin
        : rideDetails.origin.address;

    const destinationAddress =
      typeof rideDetails.destination === 'string'
        ? rideDetails.destination
        : rideDetails.destination.address;

    const originLocation =
      await this.googleMapsDataSource.geocodeAddress(originAddress);

    const destinationLocation =
      await this.googleMapsDataSource.geocodeAddress(destinationAddress);

    const driver = await this.driverRepository.findById(rideDetails.driver.id);

    if (!driver?.isEligibleForDistance(rideDetails.distance)) {
      throw new Error('Invalid distance for this driver');
    }

    const newRide: RideParams = {
      customerId,
      origin: new Location({
        address: originLocation.address.trim(),
        latitude: originLocation.latitude,
        longitude: originLocation.longitude,
      }),
      destination: new Location({
        address: destinationLocation.address.trim(),
        latitude: destinationLocation.latitude,
        longitude: destinationLocation.longitude,
      }),
      distance: rideDetails.distance,
      duration: rideDetails.duration,
      driver: rideDetails.driver,
      value: rideDetails.value,
      date: rideDetails.date,
    };

    const ride = new Ride(newRide);

    return await this.rideRepository.save(ride);
  }
}
