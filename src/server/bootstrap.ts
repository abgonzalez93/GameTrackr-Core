import { type MiddlewareOptions } from '#types/MiddlewareOptions'
import { type LoggerOptions } from '#types/LoggerOptions'
import { startServer } from './internal/startServer.js'
import { createApp } from './internal/createApp.js'
import { createI18n, initI18n } from '#i18n/i18n'
import { createLogger } from '#logger/logger'
import { Express } from 'express'
import { Logger } from 'winston'
import { i18n } from 'i18next'

/**
 * Context object containing shared infrastructure instances.
 *
 * These instances are initialized once per service and passed downstream
 * into the application layer (e.g., logger, i18n).
 */
interface InfrastructureContext {
  /** Configured Winston logger instance. */
  logger: Logger

  /** Initialized i18n instance for translations. */
  i18n: i18n
}

/**
 * Configuration options for initializing the infrastructure layer.
 *
 * @property serviceName - Human-readable label for the service (used in logs).
 * @property env - Environment object containing runtime metadata (e.g., NODE_ENV).
 * @property loggerOptions - Optional configuration for the {@link createLogger} function.
 * @property onBeforeApp - Optional hook for pre-initialization tasks (e.g., DB, cache).
 */
interface InfrastructureOptions {
  serviceName: string
  env: { NODE_ENV: string }
  loggerOptions?: LoggerOptions
  onBeforeApp?: (logger: Logger) => Promise<void>
}

/**
 * **createInfrastructure**
 *
 * Initializes the **core infrastructure layer** required by a TrackPlay service.
 *
 * ### Responsibilities
 * - Configure and instantiate the shared {@link Logger}.
 * - Execute optional pre-app initialization logic (`onBeforeApp`).
 * - Create and initialize the internationalization layer ({@link i18n}).
 *
 * ### Notes
 * - This function focuses exclusively on *low-level cross-cutting concerns*.
 * - It is called internally by {@link bootstrap} before the Express app is created.
 *
 * @param options - Infrastructure setup options (service name, env, logger, hooks).
 * @returns A promise resolving with the initialized {@link InfrastructureContext}.
 *
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

/**
 * Options used to bootstrap and start a TrackPlay service.
 *
 * @property serviceName - Name of the service (used in logs).
 * @property env - Environment variables for runtime configuration.
 * @property routes - Function that registers all service-specific routes.
 * @property loggerOptions - Optional logger customization.
 * @property middlewareOptions - Optional global middleware configuration.
 * @property onBeforeApp - Optional pre-start hook (e.g., DB connection, cache warm-up).
 */
interface BootstrapOptions {
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
 * **bootstrap**
 *
 * Entry point for initializing and starting a TrackPlay microservice.
 *
 * This helper function orchestrates the entire setup sequence:
 *
 * 1. **Initialize Infrastructure** — Logging, i18n, and pre-app hooks.
 * 2. **Create Express App** — Apply global middlewares and register routes.
 * 3. **Start Server** — Launch the HTTP/HTTPS server with configured host/port.
 *
 * ### Responsibilities
 * - Set up a shared {@link Logger} instance for structured service logs.
 * - Execute an optional `onBeforeApp` hook (e.g., connect to Redis or Prisma).
 * - Initialize i18n and register route handlers.
 * - Configure and apply CORS, compression, and error-handling middlewares.
 * - Start the server using {@link startServer}.
 *
 * ### Notes
 * - This function is intended to be called once from each service’s entrypoint.
 * - It provides a consistent bootstrapping pattern across all TrackPlay services.
 *
 * @param options - Configuration object for the current service.
 * @returns A promise that resolves once the server is successfully running.
 *
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
