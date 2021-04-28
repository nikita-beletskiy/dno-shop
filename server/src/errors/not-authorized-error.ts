import { BaseCustomError } from './abstract-base-error';

export class NotAuthorizedError extends BaseCustomError {
  statusCode = 401;

  constructor(public message: string) {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  getErrors() {
    return [{ message: this.message }];
  }
}
