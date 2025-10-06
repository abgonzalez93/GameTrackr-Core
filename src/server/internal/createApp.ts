import { createNotFoundHandler } from '#middlewares/createNotFoundHandler'
import { createErrorHandler } from '#middlewares/createErrorHandler'
import { type MiddlewareOptions } from '#types/MiddlewareOptions'
import { applyMiddlewares } from '#middlewares/applyMiddlewares'
import express, { Express } from 'express'
import { Logger } from 'winston'
import { i18n } from 'i18next'

interface CreateAppOptions {
  /** Function that registers service-specific routes onto the Express instance. */
  routes: (app: Express) => void

  /** Optional configuration for global middlewares (e.g., CORS, Helmet, error handler). */
  middlewareOptions?: MiddlewareOptions

  /** Initialized i18n instance used for translating error messages and logs. */
  i18n: i18n

  /** Winston logger instance shared across middlewares and routes. */
  logger: Logger
}

/**
 * **createApp**
 *
 * Factory function that creates and configures a fully initialized Express application.
 *
 * ### Responsibilities
 * - Instantiate a new Express app.
 * - Register core middlewares via {@link applyMiddlewares}.
 * - Attach all service-specific routes through the provided `routes` callback.
 * - Register global error handling:
 *   - 404 handler via {@link createNotFoundHandler}.
 *   - Global error formatter via {@link createErrorHandler}.
 *
 * ### Notes
 * - This function is called internally by the {@link bootstrap} process.
 * - It focuses purely on assembling the **HTTP application layer** —
 *   without handling any infrastructure or startup logic.
 * - Middlewares and error handling are **opt-in configurable** via {@link MiddlewareOptions}.
 *
 * @param options - Configuration object containing routes, middlewares, i18n, and logger.
 * @returns {Express} A fully configured Express application ready to be started by {@link startServer}.
 *
 */
export const createApp = ({ routes, middlewareOptions, i18n, logger }: CreateAppOptions): Express => {
  const app = express()

  // Apply global security, CORS, compression, and JSON middlewares
  applyMiddlewares(app, middlewareOptions)

  // Register service-specific route handlers
  routes(app)

  // Attach fallback and error handling middlewares
  app.use(createNotFoundHandler())
  app.use(createErrorHandler(i18n, logger, middlewareOptions?.errorHandler))

  return app
}
