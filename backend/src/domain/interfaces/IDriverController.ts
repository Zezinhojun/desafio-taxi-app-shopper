import { Request, Response } from "express";

export interface IDriverController {
    listDriver(req: Request, res: Response): Promise<Response>
}