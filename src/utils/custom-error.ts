import { ErrorObject } from "./types";

export class CustomError extends Error {
  statusCode: number;
  field?: string;
  err?: ErrorObject;
  constructor(
    statusCode: number,
    message: string,
    field?: string,
    err?: ErrorObject
  ) {
    super(message);
    this.statusCode = statusCode;
    this.field = field;
    this.err = err;
  }
}
