import { HTTP_STATUS } from '@constants/index'

/**
 * Represents a custom base error for the TrackPlay application.
 *
 * Contains only `message`, `statusCode` and `name`.
 *
 * @example
 * throw new TrackPlayError('Internal error')
 */
export class TrackPlayError extends Error {
  public readonly statusCode: number
  public readonly details?: unknown

  constructor(message: string, statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR, details?: unknown) {
    super(message)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.details = details

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
