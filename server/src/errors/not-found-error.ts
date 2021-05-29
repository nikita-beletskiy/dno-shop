import { BaseCustomError } from './abstract-base-error';

export class NotFoundError extends BaseCustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  getErrors() {
    return [{ message: this.message }];
  }
}
