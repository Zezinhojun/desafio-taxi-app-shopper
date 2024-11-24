import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

class ErrorHandler {
  public static readonly handleErrors: ErrorRequestHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const status = err.status || 500;

    if (err.message === 'Driver not found') {
      res.status(404).json({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: 'Driver not found',
      });
      return;
    }

    if (err.message === 'Invalid distance for this driver') {
      res.status(406).json({
        error_code: 'INVALID_DISTANCE',
        error_description: 'Invalid distance for this driver',
      });
      return;
    }

    // Para erros genéricos
    res.status(status).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description:
        'An unexpected error occurred. Please try again later.',
    });

    next();
  };
}

export default ErrorHandler;
