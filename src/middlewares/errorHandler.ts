import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@constants/index'
import { getServerConf } from '@config/index'
import { ApiError } from '@errors/index'
import { logger } from '@logger/index'

/**
 * Global error-handling middleware.
 *
 * @module middlewares
 */
export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (res.headersSent) return

  const log = logger()
  const { IS_DEVELOPMENT } = getServerConf()

  const isApiError = error instanceof ApiError
  const statusCode = isApiError ? error.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR
  const message = isApiError ? error.message : 'Unexpected error'

  const response: Record<string, unknown> = { error: message }

  if (isApiError && error.meta) {
    response.details = typeof error.meta === 'object' ? error.meta : { info: error.meta }
    log.warn(`[${statusCode}] ${message}`)
  } else {
    log.error('Unhandled error:', error)
  }

  if (IS_DEVELOPMENT && error instanceof Error) {
    response.stack = error.stack
  }

  res.status(statusCode).json(response)
}
