import type { Request, Response } from 'express'
import { type i18n } from 'i18next'
import { type Logger } from 'winston'
import { HTTP_STATUS } from '#constants/httpStatus'
import { TrackPlayError } from '#errors/base/TrackPlayError'
import { type ErrorHandlerOptions } from '#types/middlewares/ErrorHandlerOptions'
import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { translate } from '#utils/translate/translate'

/**
 * Internal structure describing key metadata derived from an error instance.
 */
interface ErrorMetadata {
  /** Numeric HTTP status code associated with the error. */
  statusCode: number
  /** Error class name (e.g., `BadRequestError`, `Error`). */
  name: string
  /** Indicates whether the error inherits from {@link TrackPlayError}. */
  isTrackPlayError: boolean
}

/**
 * Shape of the structured error response returned to the client.
 */
interface ErrorResponse {
  /** HTTP status code returned in the response. */
  statusCode: number
  /** Body content of the error response. */
  response: ErrorBody
}

/**
 * Shape of the JSON error payload sent to clients.
 */
interface ErrorBody {
  /** Short error identifier (usually the class name). */
  error: string
  /** Human-readable or translated error message. */
  message: string
  /** Optional stack trace (only in development). */
  stack?: string
  /** Optional structured metadata or validation context. */
  details?: unknown
}

const path = getTranslationPath(import.meta.url)

/**
 * Derives core metadata from an unknown error object.
 *
 * @param error - The error to inspect.
 * @returns Metadata including HTTP status, name, and type flags.
 */
const resolveErrorMetadata = (error: unknown): ErrorMetadata => {
  const isTrackPlayError = error instanceof TrackPlayError
  const statusCode = isTrackPlayError ? error.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR
  const name = isTrackPlayError ? error.name : 'Error'
  return { statusCode, name, isTrackPlayError }
}

/**
 * Resolves a translatable or fallback error message.
 *
 * @param i18n - i18next instance for translation.
 * @param logger - Winston logger for debugging or missing keys.
 * @param error - The original error object.
 * @returns A translated or fallback message string.
 */
const resolveErrorMessage = (i18n: i18n, logger: Logger, error: unknown): string => {
  const fallbackKey = `${path}.unexpected_error`

  if (error instanceof TrackPlayError) {
    const translationInput = error.i18n ? error.i18n : error.message
    return translate(i18n, logger, translationInput, fallbackKey)
  }

  return translate(i18n, logger, fallbackKey)
}

/**
 * Builds a structured {@link ErrorBody} from an error object.
 *
 * @param i18n - i18next instance for message translation.
 * @param logger - Winston logger for error reporting.
 * @param error - The error object to process.
 * @param isDevelopment - Whether to include debug fields (stack, details).
 * @param name - Short name of the error (usually class name).
 * @returns A serialized and translated error payload.
 */
const buildErrorBody = (i18n: i18n, logger: Logger, error: unknown, isDevelopment: boolean, name: string): ErrorBody => {
  const message = resolveErrorMessage(i18n, logger, error)
  const response: ErrorBody = { error: name, message }

  if (isDevelopment && error instanceof TrackPlayError) {
    if (error.stack) response.stack = error.stack.replace(/\s+/g, ' ')
    if (error.details) response.details = error.details
  }

  return response
}

/**
 * Constructs a full {@link ErrorResponse} object, combining status and body.
 *
 * @param i18n - i18next translation instance.
 * @param logger - Winston logger.
 * @param error - Raw error object.
 * @param isDevelopment - Whether to include extra debugging context.
 */
const buildErrorResponse = (i18n: i18n, logger: Logger, error: unknown, isDevelopment: boolean): ErrorResponse => {
  const { statusCode, name } = resolveErrorMetadata(error)
  const response = buildErrorBody(i18n, logger, error, isDevelopment, name)
  return { statusCode, response }
}

/**
 * **createErrorHandler**
 *
 * Factory function creating a centralized Express error-handling middleware.
 *
 * ### Responsibilities
 * - Catch and handle any thrown error within the request lifecycle.
 * - Translate messages using {@link i18n} (if applicable).
 * - Format errors consistently across all TrackPlay services.
 * - Hide internal stack traces in production for security.
 * - Log errors via Winston, including stack traces in development.
 *
 * ### Behavior
 * - For {@link TrackPlayError} instances → Uses structured metadata, translation, and HTTP status.
 * - For unrecognized errors → Returns `500 Internal Server Error` with a generic fallback translation key.
 *
 * @param i18n - i18next instance used for translations.
 * @param logger - Winston logger for structured error logging.
 * @param options - Optional configuration flags (e.g. `isDevelopment`).
 * @returns Express-compatible error handling middleware.
 *
 * @see {@link TrackPlayError}
 * @see {@link ErrorHandlerOptions}
 */
export const createErrorHandler =
  (i18n: i18n, logger: Logger, options: ErrorHandlerOptions = {}) =>
  (error: unknown, _req: Request, res: Response): void => {
    if (res.headersSent) return

    const { isDevelopment = false } = options
    const { statusCode, response } = buildErrorResponse(i18n, logger, error, isDevelopment)

    if (isDevelopment || statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      logger.error(`❌ [${response.error}] ${response.message}`, { error })
    }

    res.status(statusCode).json(response)
  }
