import { RequestHandler } from 'express';

export interface IRideController {
  estimateRide: RequestHandler;
  confirmRide: RequestHandler;
  getRideHistory: RequestHandler;
}
