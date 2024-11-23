import { Ride } from '@domain/entities/Ride';
import { IRideController } from '@domain/interfaces/IRideController';
import { RideService } from '@domain/services/RideService';
import { Request, Response } from 'express';

export class RideController implements IRideController {
  constructor(private readonly rideService: RideService) {}

  async estimateRide(req: Request, res: Response): Promise<Response> {
    const { customer_id, origin, destination } = req.body;

    try {
      const result = await this.rideService.estimateRide({
        customerId: customer_id,
        origin,
        destination,
      });
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async confirmRide(req: Request, res: Response): Promise<Response> {
    const {
      customer_id,
      origin,
      destination,
      driver,
      value,
      distance,
      duration,
    } = req.body;
    const ride = new Ride({
      customerId: customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
      date: new Date(),
    });
    try {
      await this.rideService.confirmRide({
        customerId: customer_id,
        rideDetails: ride,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getRideHistory(req: Request, res: Response): Promise<Response> {
    const { customer_id } = req.params;

    if (!customer_id) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    try {
      const rides = await this.rideService.getRideHistory(customer_id);
      return res.status(200).json(rides);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Customer not found') {
          return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
