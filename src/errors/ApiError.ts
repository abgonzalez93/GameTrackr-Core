import { HTTP_STATUS } from '@constants/index'

/**
 * Represents a custom error used across the application.
 *
 * Extends the built-in `Error` class to include an HTTP status code
 * and optional metadata for additional error context (e.g., validation issues).
 *
 * @class ApiError
 * @extends Error
 *
 * @example
 * throw new ApiError('User not found', HTTP_STATUS.NOT_FOUND)
 */
export class ApiError extends Error {
  public statusCode: number
  public meta?: unknown

  constructor(message: string, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, meta?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.meta = meta
  }
}
