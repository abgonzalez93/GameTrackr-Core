import { Request, Response, NextFunction } from 'express'
import { TrackPlayError } from '@errors/index'
import { HTTP_STATUS } from '@constants/index'
import { translate } from '@utils/index'
import { Logger } from 'winston'
import { i18n } from 'i18next'

export interface ErrorHandlerOptions {
  isDevelopment?: boolean
}

/**
 * Builds a standardized error response for Express.
 */
const buildErrorResponse = (error: unknown, i18n: i18n, isDevelopment: boolean) => {
  const isTrackPlayError = error instanceof TrackPlayError
  const statusCode = isTrackPlayError ? error.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR

  const rawMessage = isTrackPlayError
    ? error.message
    : 'core.middlewares.createErrorHandler.buildErrorResponse.unexpected_error'

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
 * Returns a configured global error handler middleware for Express.
 */
export const createErrorHandler =
  (i18n: i18n, logger: Logger, options: ErrorHandlerOptions = {}) =>
  (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (res.headersSent) return

    const { isDevelopment = false } = options
    const { statusCode, response } = buildErrorResponse(error, i18n, isDevelopment)

    if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR || isDevelopment) {
      logger.error(`❌ [${response.error}] ${response.message}`, { error })
    }

    res.status(statusCode).json(response)
  }
