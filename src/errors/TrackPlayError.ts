import { formatErrorMessage } from '#utils/translate/formatErrorMessage'
import { type TranslationOptions } from '#types/TranslationOptions'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **TrackPlayError (Base Class)**
 *
 * Represents the base error class for the TrackPlay application.
 *
 * ### Scope
 * - Serves as the foundation for all domain and HTTP-specific error classes.
 * - Extends the native {@link Error} object by including structured metadata
 *   such as status code, status name, and optional details.
 * - Supports message internationalization via {@link TranslationOptions}.
 *
 * ### Features
 * - **HTTP-aware**: includes `statusCode` and `statusName` fields for response handling.
 * - **Translatable**: accepts i18n-compatible messages (keys with interpolation variables).
 * - **Extensible**: designed for subclassing into specific HTTP errors
 *   (e.g., {@link BadRequestError}, {@link NotFoundError}).
 *
 * ### Notes
 * - If no status is provided, defaults to `500 Internal Server`.
 * - The `details` property allows attaching contextual metadata (e.g., validation info).
 * - Stack trace is captured automatically for better debugging.
 *
 * @see {@link HTTP_STATUS}
 * @see {@link TranslationOptions}
 */
export class TrackPlayError extends Error {
  /**
   * HTTP status code associated with this error.
   */
  public readonly statusCode: number

  /**
   * Short descriptive name of the HTTP status (e.g. "Bad Request").
   */
  public readonly statusName: string

  /**
   * Optional additional details providing error context (e.g., validation data).
   */
  public readonly details?: unknown

  /**
   * Constructs a new {@link TrackPlayError}.
   *
   * @param message - Translatable error message, either a plain string
   * or a {@link TranslationOptions} object for i18n support.
   * @param statusCode - HTTP status code (defaults to 500).
   * @param statusName - Short descriptive name of the HTTP status (defaults to `"Internal Server"`).
   * @param details - Optional structured metadata for debugging or response context.
   */
  constructor(
    message: string | TranslationOptions,
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
