import { Request, Response, NextFunction } from 'express';
import { BaseCustomError } from '../errors/abstract-base-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err instanceof BaseCustomError
    ? res.status(err.statusCode).send({ errors: err.getErrors() })
    : res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
