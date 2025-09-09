import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '@errors/index'

/**
 * Creates a 404 handler middleware with i18n support
 */
export const createNotFoundHandler =
  () =>
  (req: Request, _res: Response, next: NextFunction): void => {
    next(
      new NotFoundError({
        key: 'core.middlewares.createNotFoundHandler.route_not_found',
        variables: { url: req.originalUrl },
      }),
    )
  }
