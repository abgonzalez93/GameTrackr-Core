import express, { Express } from 'express'
import { MiddlewareOptions, applyMiddlewares } from '@middlewares/index'
import { errorHandler, notFoundHandler } from '../middlewares'

type CreateAppOptions = {
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
export function createApp({ routes, middlewares }: CreateAppOptions): Express {
  const app = express()

  applyMiddlewares(app, middlewares)

  routes(app)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
