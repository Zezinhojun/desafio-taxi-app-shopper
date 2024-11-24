import { RequestHandler } from 'express';

export class RideValidator {
  public static readonly validateEstimateRide: RequestHandler = (
    req,
    res,
    next,
  ) => {
    const { customer_id, origin, destination } = req.body;

    if (!customer_id) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'The customer ID is missing.',
      });
      return;
    }

    if (!origin || !destination) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'The origin and destination are missing.',
      });
      return;
    }

    if (origin === destination) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'The origin and destination cannot be the same.',
      });
      return;
    }

    next();
  };
  public static readonly validateConfirmRide: RequestHandler = (
    req,
    res,
    next,
  ) => {
    const { customer_id, origin, destination, driver, distance } = req.body;

    if (!customer_id) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'The customer ID is missing.',
      });
      return;
    }

    if (!origin || !destination) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'The origin and destination are missing.',
      });
      return;
    }

    if (origin === destination) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'The origin and destination cannot be the same.',
      });
      return;
    }

    if (!driver) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'A valid driver option must be provided.',
      });
      return;
    }

    if (distance <= 0) {
      res.status(406).json({
        error_code: 'INVALID_DISTANCE',
        error_description: 'The provided distance is invalid for the driver.',
      });
      return;
    }
    next();
  };
}
