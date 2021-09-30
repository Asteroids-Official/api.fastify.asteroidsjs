import { HttpStatus } from '../enums/http-status.enum'

/**
 * Exception that represents errors occured in the application.
 */
export class HttpException extends Error {
  constructor(
    /**
     * Property that defines a string that represents the error text.
     */
    public message: string,
    /**
     * Property that defines a number that represents the error status code.
     */
    public status: HttpStatus,
    /**
     * Property that defines an object that represents the time that the
     * exeption has raised.
     */
    public timestamp: Date,
  ) {
    super(message)
  }
}
