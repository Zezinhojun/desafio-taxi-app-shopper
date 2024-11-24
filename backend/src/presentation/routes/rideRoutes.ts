import { IRideController } from '@domain/interfaces/IRideController';
import { TYPES } from '@shared/di/Types';
import { RideValidator } from '@shared/utils/validation';
import { Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class RideRoutes {
  public readonly router: Router;
  constructor(
    @inject(TYPES.RideController)
    private readonly rideController: IRideController,
  ) {
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

    this.router.get('/history', RideValidator.validateCustomerAndDriver);

    this.router.get(
      '/history/:customer_id',
      RideValidator.validateCustomerAndDriver,
      this.rideController.getRideHistory,
    );
  }
}
