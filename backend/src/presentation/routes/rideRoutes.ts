import { IRideController } from '@domain/interfaces/IRideController';
import { RideValidator } from '@shared/utils/validation';
import { Router } from 'express';

export class RideRoutes {
  public readonly router: Router;
  constructor(private readonly rideController: IRideController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/estimate',
      RideValidator.validateEstimateRide,
      this.rideController.estimateRide,
    );

    this.router.patch(
      '/confirm',
      RideValidator.validateConfirmRide,
      this.rideController.confirmRide,
    );

    this.router.get(
      '/history/:customer_id',
      this.rideController.getRideHistory,
    );
  }
}
