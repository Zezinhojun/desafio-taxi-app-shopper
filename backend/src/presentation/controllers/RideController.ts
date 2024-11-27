import { Ride } from '@domain/entities/Ride';
import { IRideController } from '@domain/interfaces/IRideController';
import { RideService } from '@domain/services/RideService';
import { TYPES } from '@shared/di/Types';
import { RequestHandler } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class RideController implements IRideController {
  constructor(
    @inject(TYPES.RideService)
    private readonly rideService: RideService,
  ) { }

  estimateRide: RequestHandler = async (req, res, next) => {
    const { customer_id, origin, destination } = req.body;

    try {
      const result = await this.rideService.estimateRide({
        customerId: customer_id,
        origin,
        destination,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  confirmRide: RequestHandler = async (req, res, next) => {
    const {
      customer_id,
      origin,
      destination,
      driver,
      value,
    } = req.body;

    const ride = {
      customerId: customer_id,
      origin,
      destination,
      driver,
      value,
      date: new Date(),
    };

    try {
      await this.rideService.confirmRide({
        customerId: customer_id,
        rideDetails: ride as Ride,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  };
  getRideHistory: RequestHandler = async (req, res, next) => {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    if (!customer_id) {
      res.status(400).json({ error: 'Customer ID is required' });
    }

    try {
      const driverId = driver_id ? Number(driver_id) : undefined;
      const rides = await this.rideService.getRideHistory(
        customer_id,
        driverId,
      );

      res.status(200).json(rides);
    } catch (error) {
      next(error);
    }
  };
}
