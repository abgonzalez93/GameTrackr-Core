import type { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '@errors/index'
import { getI18n } from '@i18n/index'

const i18n = getI18n()

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
    const defaultMessage = i18n.t('core.middlewares.createNotFoundHandler.route_not_found', { url: req.originalUrl })
    const message = options.message ?? defaultMessage
    next(new NotFoundError(message))
  }
