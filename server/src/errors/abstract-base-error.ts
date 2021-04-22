export abstract class BaseCustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  abstract getErrors(): { message: string; field?: string }[];
}
