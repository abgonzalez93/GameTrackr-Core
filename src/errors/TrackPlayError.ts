import { HTTP_STATUS } from '@constants/index'

/**
 * Base error class for TrackPlay with status code, status name and details.
 */
export class TrackPlayError extends Error {
  public readonly statusCode: number
  public readonly statusName: string
  public readonly details?: unknown

  constructor(
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    statusName: string = 'Internal Server',
    details?: unknown,
  ) {
    super(message)

    this.name = `${statusCode} ${statusName}`
    this.statusCode = statusCode
    this.statusName = statusName
    this.details = details

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target)
    }
  }
}
