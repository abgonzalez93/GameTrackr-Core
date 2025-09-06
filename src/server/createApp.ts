import { MiddlewareOptions, applyMiddlewares, createErrorHandler, createNotFoundHandler } from '@middlewares/index'
import express, { Express } from 'express'
import { Logger } from 'winston'
import { i18n } from 'i18next'

export interface CreateAppOptions {
  routes: (app: Express) => void
  middlewareOptions?: MiddlewareOptions
  i18n: i18n
  logger: Logger
}

/**
 * Creates and configures an Express app with shared middlewares and routes.
 *
 * @param routes - A function that receives the Express app instance and registers service-specific routes.
 * @param middlewares - Optional object to provide additional or overriding middlewares for this service.
 * @param i18n - Optional i18n instance to attach to the app for localized messages.
 * @param logger - Optional logger instance to be used by middlewares and routes.
 * @returns Configured Express app
 */
export const createApp = ({ routes, middlewareOptions, i18n, logger }: CreateAppOptions): Express => {
  const app = express()

  applyMiddlewares(app, middlewareOptions)

  routes(app)

  app.use(createNotFoundHandler())
  app.use(createErrorHandler(i18n, logger, middlewareOptions?.errorHandler))

  return app
}
