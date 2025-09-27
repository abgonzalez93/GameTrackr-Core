import { createLogger, LoggerOptions } from '@logger/index'
import { MiddlewareOptions } from '@middlewares/index'
import { startServer } from './internal/startServer'
import { createI18n, initI18n } from '@i18n/index'
import { createApp } from './internal/createApp'
import { Express } from 'express'

type BootstrapOptions = {
  serviceName: string
  routes: (app: Express) => void
  env: {
    NODE_ENV: string
    HOST: string
    PORT: number
    CORS_ORIGINS: string
  }
  loggerOptions?: LoggerOptions
  middlewareOptions?: MiddlewareOptions
  onBeforeApp?: (logger: ReturnType<typeof createLogger>) => Promise<void>
}

/**
 * Bootstraps a TrackPlay service by configuring logging, i18n, middlewares, routes,
 * and starting the HTTP/HTTPS server.
 *
 * This helper centralizes common initialization logic across all services
 * (Catalog, Auth, Backend, etc.), ensuring consistency while allowing
 * service-specific customization through options.
 *
 * Responsibilities:
 * - Creates and configures a {@link winston.Logger} via {@link createLogger}.
 * - Executes an optional `onBeforeApp` hook (e.g., connect to Redis, Prisma).
 * - Initializes i18n with {@link createI18n} and {@link initI18n}.
 * - Creates an Express app with {@link createApp}, applying global middlewares.
 * - Starts the HTTP or HTTPS server via {@link startServer}.
 *
 * @param {BootstrapOptions} options - Configuration object.
 * @param {string} options.serviceName - Human-readable label for the service (used in logs).
 * @param {(app: Express) => void} options.routes - Function that registers service routes.
 * @param {object} options.env - Environment configuration object specific to each service.
 * @param {string} options.env.NODE_ENV - Environment (`development` or `production`).
 * @param {string} options.env.HOST - Hostname or IP to bind the server.
 * @param {number} options.env.PORT - Port number to listen on.
 * @param {string} options.env.CORS_ORIGINS - Comma-separated list of allowed CORS origins.
 * @param {LoggerOptions} [options.loggerOptions] - Additional logger configuration (level, label, etc.).
 * @param {MiddlewareOptions} [options.middlewareOptions] - Additional middleware options.
 * @param {(logger: ReturnType<typeof createLogger>) => Promise<void>} [options.onBeforeApp] -
 *   Optional async hook executed before the app is created. Useful for DB/cache connections.
 *
 * @returns {Promise<void>} A promise that resolves once the server is running.
 *
 */
export const bootstrap = async ({
  serviceName,
  routes,
  env,
  loggerOptions,
  middlewareOptions,
  onBeforeApp,
}: BootstrapOptions) => {
  const { NODE_ENV, HOST, PORT, CORS_ORIGINS } = env
  const isDevelopment = NODE_ENV === 'development'
  const corsOrigins = CORS_ORIGINS.split(',')

  const logger = createLogger({
    label: serviceName,
    isDevelopment,
    level: 'info',
    ...loggerOptions,
  })

  if (onBeforeApp) await onBeforeApp(logger)

  const i18n = createI18n()
  await initI18n(i18n)

  const app = createApp({
    routes,
    middlewareOptions: {
      cors: { origin: corsOrigins, credentials: true },
      errorHandler: { isDevelopment },
      ...middlewareOptions,
    },
    i18n,
    logger,
  })

  startServer(app, logger, {
    protocol: isDevelopment ? 'http' : 'https',
    host: HOST,
    port: PORT,
  })
}
