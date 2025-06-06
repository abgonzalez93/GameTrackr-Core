import type { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@constants/index'
import { ApiError } from '@errors/index'

export interface NotFoundHandlerOptions {
  message?: string
}

/**
 * Returns an Express middleware to handle unmatched routes (404 Not Found).
 *
 * @param options - Optional configuration such as a custom message
 * @returns Express-compatible middleware for handling 404 errors
 *
 * @module middlewares
 */
export const createNotFoundHandler =
  (options: NotFoundHandlerOptions = {}) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const defaultMessage = `The route '${req.originalUrl}' does not exist.`
    const message = options.message ?? defaultMessage
    next(new ApiError(message, HTTP_STATUS.NOT_FOUND))
  }
