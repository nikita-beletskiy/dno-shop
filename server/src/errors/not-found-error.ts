import { BaseCustomError } from './abstract-base-error';

export class NotFoundError extends BaseCustomError {
  statusCode = 404;

  constructor() {
    super('Requested route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  getErrors() {
    return [{ message: 'Not Found' }];
  }
}
