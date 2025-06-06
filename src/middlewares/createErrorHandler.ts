import type { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@constants/index'
import { getLogger } from '@logger/index'
import { ApiError } from '@errors/index'

export interface ErrorHandlerOptions {
  isDevelopment?: boolean
}

/**
 * Returns a configured global error handler middleware for Express.
 *
 * @param options - Configuration flags (e.g., isDevelopment)
 * @returns Express-compatible error-handling middleware
 *
 * @module middlewares
 */
export const createErrorHandler =
  ({ isDevelopment = false }: ErrorHandlerOptions = {}) =>
  (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (res.headersSent) return

    const log = getLogger()

    const isApiError = error instanceof ApiError
    const statusCode = isApiError ? error.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR
    const isNotFound = statusCode === HTTP_STATUS.NOT_FOUND
    const message = isApiError ? error.message : 'Unexpected error'

    const response: Record<string, unknown> = { error: message }

    if (isApiError && error.meta) {
      response.details = typeof error.meta === 'object' ? error.meta : { info: error.meta }
      log.warn(`[${statusCode}] ${message}`)
    } else {
      log.error('Unhandled error:', error)
    }

    if (isDevelopment && !isNotFound && error instanceof Error) {
      response.stack = error.stack?.split('\n').slice(0, 5).join('\n')
    }

    res.status(statusCode).json(response)
  }
