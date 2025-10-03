import { getTranslationPath, translate } from '@utils/index'
import { Request, Response, NextFunction } from 'express'
import { TrackPlayError } from '@errors/index'
import { HTTP_STATUS } from '@constants/index'
import { Logger } from 'winston'
import { i18n } from 'i18next'

const path = getTranslationPath(import.meta.url)

/**
 * Options for configuring the global error handler middleware.
 *
 * @property isDevelopment - Enables verbose stack traces and logging if `true`.
 */
export interface ErrorHandlerOptions {
  isDevelopment?: boolean
}

/**
 * **buildErrorResponse**
 *
 * Constructs a standardized error response object for Express routes.
 *
 * ### Responsibilities
 * - Normalize known {@link TrackPlayError} instances into structured responses.
 * - Map unknown errors to a generic internal server error.
 * - Translate error messages using the provided {@link i18n} instance.
 * - Include formatted stack traces in development mode.
 *
 * @param error - The thrown error (either {@link TrackPlayError} or unknown).
 * @param i18n - i18n instance used for message translation.
 * @param isDevelopment - Whether to include stack traces (default: `false`).
 * @returns An object containing:
 *  - `statusCode` — HTTP status to send.
 *  - `response` — Serialized error response.
 *
 */
const buildErrorResponse = (error: unknown, i18n: i18n, isDevelopment: boolean) => {
  const isTrackPlayError = error instanceof TrackPlayError
  const statusCode = isTrackPlayError ? error.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR

  const rawMessage = isTrackPlayError ? error.message : `${path}.unexpected_error`
  const message = translate(i18n, rawMessage)
  const name = isTrackPlayError ? error.name : 'Error'

  const response: Record<string, unknown> = { error: name, message }

  if (isDevelopment && isTrackPlayError && error.stack) {
    response.stack = error.stack
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join(' ')
  }

  return { statusCode, response }
}

/**
 * **createErrorHandler**
 *
 * Factory function that returns an Express-compatible global error handler.
 *
 * ### Responsibilities
 * - Capture unhandled errors thrown in route handlers or middleware.
 * - Normalize known errors into structured HTTP responses.
 * - Log critical or unexpected errors via the provided {@link Logger}.
 * - Localize error messages using {@link i18n}.
 *
 * ### Behavior
 * - For known {@link TrackPlayError}s, uses their `statusCode` and `message`.
 * - For unknown errors, defaults to HTTP 500 (`Internal Server Error`).
 * - In development mode:
 *   - Logs all errors regardless of severity.
 *   - Includes formatted stack traces in JSON output.
 * - In production mode:
 *   - Logs only server-side (5xx) errors.
 *
 * @param i18n - Initialized i18n instance for message translation.
 * @param logger - Winston logger used for structured error logging.
 * @param options - Optional configuration for development mode.
 * @returns Express error-handling middleware.
 */
export const createErrorHandler =
  (i18n: i18n, logger: Logger, options: ErrorHandlerOptions = {}) =>
  (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (res.headersSent) return

    const { isDevelopment = false } = options
    const { statusCode, response } = buildErrorResponse(error, i18n, isDevelopment)

    // Log only in development or for critical server-side errors
    if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR || isDevelopment) {
      logger.error(`❌ [${response.error}] ${response.message}`, { error })
    }

    res.status(statusCode).json(response)
  }
