import { MiddlewareOptions, applyMiddlewares, createErrorHandler, createNotFoundHandler } from '@middlewares/index'
import express, { Express } from 'express'

export interface CreateAppOptions {
  routes: (app: Express) => void
  middlewares?: MiddlewareOptions
}

/**
 * Creates and configures an Express app with shared middlewares and routes.
 *
 * @param routes - Function to register service-specific routes
 * @param middlewares - Optional per-service middleware configuration
 * @returns Configured Express app
 *
 * @module server
 */
export const createApp = ({ routes, middlewares }: CreateAppOptions): Express => {
  const app = express()

  applyMiddlewares(app, middlewares)

  routes(app)

  app.use(createNotFoundHandler(middlewares?.notFoundHandler))
  app.use(createErrorHandler(middlewares?.errorHandler))

  return app
}
