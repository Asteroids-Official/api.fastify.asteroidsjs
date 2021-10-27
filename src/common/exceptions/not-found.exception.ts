import { HttpException } from '../shared/http.exception'

/**
 * Exception that is raised when something is not found. Can be a route or
 * an entity.
 */
export class NotFoundException extends HttpException {
  constructor(
    /**
     * Property that defines a string that represents the error text.
     */
    public message = 'Not found',
    /**
     * Property that defines a number that represents the error status code.
     */
    public statusCode = 404,
    /**
     * Property that defines an object that represents the time that the
     * exception has raised.
     */
    public timestamp = new Date(),
  ) {
    super(message, statusCode, timestamp)
  }
}
