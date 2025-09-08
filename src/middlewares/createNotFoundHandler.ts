import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '@errors/index'
import { CorePath } from '@i18n/index'

/**
 * Creates a 404 handler middleware with i18n support
 */
export const createNotFoundHandler =
  () =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const path: CorePath = 'core.middlewares.createNotFoundHandler.route_not_found'

    next(
      new NotFoundError({
        key: path,
        variables: { url: req.originalUrl },
      }),
    )
  }
