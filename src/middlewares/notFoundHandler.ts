import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@constants/index'
import { ApiError } from '@errors/index'

/**
 * Middleware for handling unmatched routes (404 Not Found).
 *
 * @module middlewares
 */
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  const message = `The route '${req.originalUrl}' does not exist.`
  next(new ApiError(message, HTTP_STATUS.NOT_FOUND))
}
