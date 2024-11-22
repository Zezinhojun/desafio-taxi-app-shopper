import { Ride } from '@domain/entities/Ride';
import { RideService } from '@domain/services/RideService';

export class ConfirmRideUseCase {
  constructor(private readonly rideService: RideService) {}
  async execute(customerId: string, rideDetails: Ride): Promise<Ride> {
    return await this.rideService.confirmRide(customerId, rideDetails);
  }
}
