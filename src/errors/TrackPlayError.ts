import { formatErrorMessage, TranslationParams } from '@utils/index'
import { HTTP_STATUS } from '@constants/index'

/**
 * Base error class for the TrackPlay application.
 *
 * Extends the native `Error` object by including an HTTP status code,
 * a status name, and optional extra details. It also supports message
 * internationalization through `TranslationParams`.
 */
export class TrackPlayError extends Error {
  public readonly statusCode: number
  public readonly statusName: string
  public readonly details?: unknown

  /**
   * Creates a new `TrackPlayError`.
   *
   * @param message - Translatable error message, containing a translation key
   * and optional variables for interpolation.
   * @param statusCode - HTTP status code (defaults to 500).
   * @param statusName - Short descriptive name of the HTTP status (defaults to "Internal Server").
   * @param details - Optional extra details to include with the error (e.g., validation context).
   */
  constructor(
    message: string | TranslationParams,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    statusName: string = 'Internal Server',
    details?: unknown,
  ) {
    super(formatErrorMessage(message))

    this.name = `${statusCode} ${statusName}`
    this.statusCode = statusCode
    this.statusName = statusName
    this.details = details

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target)
    }
  }
}
