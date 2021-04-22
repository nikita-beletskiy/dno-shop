import { ValidationError } from 'express-validator';
import { BaseCustomError } from './abstract-base-error';

export class RequestValidationError extends BaseCustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  getErrors() {
    return this.errors.map(err => ({ message: err.msg, field: err.param }));
  }
}
