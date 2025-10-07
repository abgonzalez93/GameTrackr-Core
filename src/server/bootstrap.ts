import { type MiddlewareOptions } from '#types/middlewares/MiddlewareOptions'
import { createNotFoundHandler } from '#middlewares/createNotFoundHandler'
import { createErrorHandler } from '#middlewares/createErrorHandler'
import { type LoggerOptions } from '#types/logger/LoggerOptions'
import { applyMiddlewares } from '#middlewares/applyMiddlewares'
import { type ServiceRuntime } from './ServiceRuntime.js'
import { createLogger } from '#logger/createLogger'
import { getBaseUrl } from '#utils/http/getBaseUrl'
import express, { type Express } from 'express'
import { createI18n } from '#i18n/createI18n'
import { initI18n } from '#i18n/initI18n'
import { type Logger } from 'winston'
import { type i18n } from 'i18next'

/**
 * **InfrastructureInstance**
 *
 * Represents the set of shared infrastructure-level instances
 * initialized during service startup — typically logger and i18n.
 *
 * ### Purpose
 * Acts as the foundation of the service runtime, providing
 * cross-cutting dependencies that are injected downstream.
 *
 * ### Notes
 * - Created once per service during bootstrap.
 * - Passed to middleware, routes, and use cases as shared context.
 *
 * @see {@link createInfrastructure}
 */
interface InfrastructureInstance {
  logger: Logger
  i18n: i18n
}

/**
 * **EnvConfig**
 *
 * Represents the normalized runtime environment configuration
 * required for service initialization and networking.
 *
 * @property NODE_ENV - Runtime environment (`development`, `production`, or `test`).
 * @property HOST - Hostname or IP address for the service.
 * @property PORT - TCP port where the service listens.
 * @property CORS_ORIGINS - Comma-separated list of allowed CORS origins.
 */
interface EnvConfig {
  NODE_ENV: string
  HOST: string
  PORT: number
  CORS_ORIGINS: string
}

/**
 * **InfrastructureOptions**
 *
 * Configuration object for initializing the infrastructure layer.
 *
 * ### Responsibilities
 * - Configure and create a {@link Logger}.
 * - Initialize the i18n translation system.
 * - Execute optional async hooks before app creation (e.g., DB/Redis connections).
 */
interface InfrastructureOptions {
  serviceName: string
  env: EnvConfig
  loggerOptions?: LoggerOptions
  onBeforeApp?: (logger: Logger) => Promise<void>
}

/**
 * **createInfrastructure**
 *
 * Initializes cross-cutting dependencies required by every TrackPlay service.
 *
 * ### Flow
 * 1. Creates and configures the {@link Logger}.
 * 2. Initializes and loads i18n translations.
 * 3. Executes optional pre-initialization hooks.
 *
 * @param options - Infrastructure initialization parameters.
 * @returns Promise resolving to a configured {@link InfrastructureInstance}.
 */
const createInfrastructure = async ({
  serviceName,
  env,
  loggerOptions,
  onBeforeApp,
}: InfrastructureOptions): Promise<InfrastructureInstance> => {
  const isDevelopment = env.NODE_ENV === 'development'

  const logger = createLogger({
    label: serviceName,
    isDevelopment,
    level: 'info',
    ...loggerOptions,
  })

  const i18n = createI18n()
  await initI18n(i18n)

  if (onBeforeApp) await onBeforeApp(logger)

  return { logger, i18n }
}

/**
 * **CreateAppOptions**
 *
 * Defines configuration options for constructing an Express application.
 *
 * ### Responsibilities
 * - Apply global middlewares (CORS, security, compression, JSON, etc.).
 * - Register route definitions.
 * - Attach fallback and global error handlers.
 */
interface CreateAppOptions {
  routes: (app: Express) => void
  middlewareOptions?: MiddlewareOptions
  i18n: i18n
  logger: Logger
}

/**
 * **createApp**
 *
 * Creates and configures a production-ready Express application instance.
 *
 * ### Flow
 * 1. Applies global middlewares via {@link applyMiddlewares}.
 * 2. Registers service-specific routes.
 * 3. Adds not-found and error-handling middlewares.
 *
 * @param options - Configuration object for app setup.
 * @returns Configured {@link Express} application instance.
 */
const createApp = ({ routes, middlewareOptions, i18n, logger }: CreateAppOptions): Express => {
  const app = express()

  // Apply security, compression, and JSON middlewares
  applyMiddlewares(app, middlewareOptions ?? {})

  // Register service routes
  routes(app)

  // Global 404 and error handling
  app.use(createNotFoundHandler())
  app.use(createErrorHandler(i18n, logger, middlewareOptions?.errorHandler))

  return app
}

/**
 * **ServerOptions**
 *
 * Configuration for launching the HTTP/HTTPS server.
 *
 * @property protocol - Network protocol (`http` by default, or `https`).
 * @property host - Hostname or IP address.
 * @property port - Port number where the server listens.
 */
interface ServerOptions {
  protocol?: 'http' | 'https'
  host: string
  port: number
}

/**
 * **startServer**
 *
 * Starts the HTTP server using the provided configuration.
 *
 * ### Responsibilities
 * - Launches the Express app on the configured host/port.
 * - Logs the running base URL via {@link getBaseUrl}.
 *
 * @param app - Express application instance.
 * @param logger - Winston logger used to log startup information.
 * @param options - Server configuration options.
 */
const startServer = (app: Express, logger: Logger, options: ServerOptions): void => {
  const { protocol = 'http' } = options
  app.listen(options.port, options.host, () => logger.info(`✅ Server running at ${getBaseUrl({ ...options, protocol })}`))
}

/**
 * **BootstrapOptions**
 *
 * Parameters required to initialize and launch a TrackPlay service.
 *
 * ### Responsibilities
 * - Configure infrastructure dependencies (logger, i18n).
 * - Build an Express app with routes and middlewares.
 * - Start the HTTP/HTTPS server and log runtime URL.
 */
interface BootstrapOptions {
  serviceName: string
  env: EnvConfig
  routes: (app: Express) => void
  loggerOptions?: LoggerOptions
  middlewareOptions?: MiddlewareOptions
  onBeforeApp?: (logger: Logger) => Promise<void>
}

/**
 * **bootstrap**
 *
 * Unified entry point for initializing and starting a TrackPlay microservice.
 *
 * ### Flow
 * 1. **Infrastructure Setup** — Initializes logger, i18n, and pre-app hooks.
 * 2. **App Creation** — Applies middlewares and registers routes.
 * 3. **Server Launch** — Starts the Express server and logs the service URL.
 *
 * @param options - Full configuration object for service initialization.
 * @returns {Promise<ServiceRuntime>} The live {@link ServiceRuntime} context of the running service.
 */
export const bootstrap = async (options: BootstrapOptions): Promise<ServiceRuntime> => {
  const { env, serviceName, routes, loggerOptions, middlewareOptions, onBeforeApp } = options
  const { NODE_ENV, HOST, PORT, CORS_ORIGINS } = env

  const isDevelopment = NODE_ENV === 'development'

  const { logger, i18n } = await createInfrastructure({
    serviceName,
    env,
    loggerOptions,
    onBeforeApp,
  })

  const corsOrigins = CORS_ORIGINS
    ? CORS_ORIGINS.split(',')
        .map((o) => o.trim())
        .filter(Boolean)
    : []

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

  return { app, logger, i18n }
}
