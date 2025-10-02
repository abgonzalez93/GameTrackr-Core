import { createLogger, LoggerOptions } from '@logger/index'
import { MiddlewareOptions } from '@middlewares/index'
import { startServer } from './internal/startServer'
import { createI18n, initI18n } from '@i18n/index'
import { createApp } from './internal/createApp'
import { Express } from 'express'
import { Logger } from 'winston'
import { i18n } from 'i18next'

interface InfrastructureContext {
  logger: Logger
  i18n: i18n
}

interface InfrastructureOptions {
  serviceName: string
  env: { NODE_ENV: string }
  loggerOptions?: LoggerOptions
  onBeforeApp?: (logger: Logger) => Promise<void>
}

/**
 * Initializes the core infrastructure required for a TrackPlay service.
 *
 * This helper encapsulates the setup of shared low-level utilities such as:
 * - Logging (via {@link createLogger})
 * - Internationalization (via {@link createI18n} and {@link initI18n})
 * - Optional pre-app hook (`onBeforeApp`) for tasks like DB or cache initialization
 *
 * It serves as a foundational layer used by higher-level bootstrapping logic.
 *
 * @param {InfrastructureOptions} options - Configuration object.
 * @param {string} options.serviceName - Human-readable label for the service, used in logs.
 * @param {{ NODE_ENV: string }} options.env - Environment object containing the runtime mode.
 * @param {LoggerOptions} [options.loggerOptions] - Optional logger configuration (level, format, transports, etc.).
 * @param {(logger: Logger) => Promise<void>} [options.onBeforeApp] -
 *   Optional async hook executed before the application is initialized. Commonly used for database or Redis connections.
 *
 * @returns {Promise<InfrastructureContext>} A promise resolving with initialized `logger` and `i18n` instances.
 */
const createInfrastructure = async ({
  serviceName,
  env,
  loggerOptions,
  onBeforeApp,
}: InfrastructureOptions): Promise<InfrastructureContext> => {
  const { NODE_ENV } = env
  const isDevelopment = NODE_ENV === 'development'

  const logger = createLogger({
    label: serviceName,
    isDevelopment,
    level: 'info',
    ...loggerOptions,
  })

  if (onBeforeApp) await onBeforeApp(logger)

  const i18n = createI18n()
  await initI18n(i18n)

  return { logger, i18n }
}

type BootstrapOptions = {
  serviceName: string
  env: {
    NODE_ENV: string
    HOST: string
    PORT: number
    CORS_ORIGINS: string
  }
  routes: (app: Express) => void
  loggerOptions?: LoggerOptions
  middlewareOptions?: MiddlewareOptions
  onBeforeApp?: (logger: Logger) => Promise<void>
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
 * @param {(logger: Logger) => Promise<void>} [options.onBeforeApp] -
 *   Optional async hook executed before the app is created. Useful for DB/cache connections.
 *
 * @returns {Promise<void>} A promise that resolves once the server is running.
 */
export const bootstrap = async (options: BootstrapOptions) => {
  const { env, serviceName, routes, loggerOptions, middlewareOptions, onBeforeApp } = options

  const { logger, i18n } = await createInfrastructure({
    serviceName,
    env,
    loggerOptions,
    onBeforeApp,
  })

  const { NODE_ENV, HOST, PORT, CORS_ORIGINS } = env

  const isDevelopment = NODE_ENV === 'development'
  const corsOrigins = CORS_ORIGINS.split(',')

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
