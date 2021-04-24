import { Request, Response, NextFunction } from 'express';
import { BaseCustomError } from '../errors/abstract-base-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err instanceof BaseCustomError
    ? res
        .status(err.statusCode)
        .send({ error_type: 'handled', errors: err.getErrors() })
    : res.status(400).send({
        error_type: 'unhandled',
        errors: [{ message: 'Something went wrong' }]
      });
};
