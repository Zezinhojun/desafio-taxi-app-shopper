import { Request, Response } from 'express'

export interface IRideController {
    estimateRide(req: Request, res: Response): Promise<Response>
    confirmRide(req: Request, res: Response): Promise<Response>
    getRideHistory(req: Request, res: Response): Promise<Response>
}