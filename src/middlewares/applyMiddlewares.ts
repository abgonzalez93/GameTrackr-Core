import { type MiddlewareOptions } from '#types/MiddlewareOptions'
import { Express, json, RequestHandler } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

/**
 * **useIfEnabled**
 *
 * Utility helper that conditionally registers a middleware
 * only when its configuration is not explicitly set to `false`.
 *
 * This prevents unnecessary registration of disabled features,
 * while still allowing custom configuration when provided.
 *
 * @template Options - Type of the middleware configuration.
 * @param app - Express application instance.
 * @param middleware - The middleware factory function (e.g., `helmet`, `cors`).
 * @param opts - Configuration options or `false` to disable.
 *
 */
const useIfEnabled = <Options>(
  app: Express,
  middleware: (options?: Options) => RequestHandler,
  opts?: Options | false,
): void => {
  if (opts !== false) app.use(middleware(opts))
}

/**
 * **applyMiddlewares**
 *
 * Registers the global middleware stack for the Express application.
 *
 * ### Responsibilities
 * - Secure HTTP headers using {@link helmet}.
 * - Enable CORS for cross-origin requests using {@link cors}.
 * - Compress responses with {@link compression}.
 * - Parse JSON bodies automatically using Express’s built-in middleware.
 *
 * ### Notes
 * - Middleware can be selectively disabled by passing `false`
 *   in the corresponding option (e.g. `helmet: false`).
 * - Error handling middleware should be applied **after**
 *   route registration, not here.
 *
 * @param app - Express application instance.
 * @param options - Middleware configuration options.
 */
export const applyMiddlewares = (app: Express, options: MiddlewareOptions = {}): void => {
  const { helmet: helmetOpts = {}, cors: corsOpts = {}, enableCompression = true, enableJson = true } = options

  useIfEnabled(app, helmet, helmetOpts)
  useIfEnabled(app, cors, corsOpts)

  if (enableCompression) app.use(compression())
  if (enableJson) app.use(json())
}
