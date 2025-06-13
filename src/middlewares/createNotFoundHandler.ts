import type { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '@errors/index'

export interface NotFoundHandlerOptions {
  message?: string
}

/**
 * Returns an Express middleware to handle unmatched routes (404 Not Found).
 *
 * @param options - Optional configuration such as a custom message
 * @returns Express-compatible middleware for handling 404 errors
 */
export const createNotFoundHandler =
  (options: NotFoundHandlerOptions = {}) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const defaultMessage = `The route '${req.originalUrl}' does not exist.`
    const message = options.message ?? defaultMessage
    next(new NotFoundError(message))
  }
