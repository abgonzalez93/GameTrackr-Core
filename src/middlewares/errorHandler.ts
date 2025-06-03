import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@constants/index'
import { ApiError } from '@errors/index'
import { logger } from '@logger/index'

/**
 * Global error-handling middleware.
 *
 * @module middlewares
 */
export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  const isApiError = error instanceof ApiError

  if (!isApiError) logger.error('Unhandled error:', error)

  const statusCode = isApiError ? error.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR
  const message = isApiError ? error.message : 'Unexpected error'
  const response: Record<string, unknown> = { error: message }

  if (isApiError && error.meta) response.details = error.meta

  res.status(statusCode).json(response)
}
