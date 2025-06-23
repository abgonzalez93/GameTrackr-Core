import type { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@constants/index'
import { TrackPlayError } from '@errors/index'
import { getLogger } from '@logger/index'

export interface ErrorHandlerOptions {
  isDevelopment?: boolean
}

/**
 * Returns a configured global error handler middleware for Express.
 *
 * @param options - Configuration flags (e.g., isDevelopment)
 * @returns Express-compatible error-handling middleware
 */
export const createErrorHandler =
  ({ isDevelopment = false }: ErrorHandlerOptions = {}) =>
  (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (res.headersSent) return

    const log = getLogger()

    const isTrackPlayError = error instanceof TrackPlayError
    const statusCode = isTrackPlayError ? error.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR
    const message = isTrackPlayError ? error.message : 'Unexpected error'
    const name = error instanceof Error ? error.name : 'Error'

    if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR || isDevelopment) {
      log.error(`${name}: ${message}`, { error })
    }

    const response: Record<string, unknown> = {
      error: name,
      message,
    }

    if (isDevelopment && error instanceof Error && error.stack) {
      response.stack = error.stack
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join(' ')
    }

    res.status(statusCode).json(response)
  }
