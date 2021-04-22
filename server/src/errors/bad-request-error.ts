import { BaseCustomError } from './abstract-base-error';

export class BadRequestError extends BaseCustomError {
  statusCode = 400;

  constructor(public message: string, public field?: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  getErrors() {
    return [{ message: this.message, field: this.field }];
  }
}
