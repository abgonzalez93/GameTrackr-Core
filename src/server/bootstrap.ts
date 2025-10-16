import express, { type Express } from 'express'
import { type i18n } from 'i18next'
import { type Logger } from 'winston'
import { createEnvConfig } from '#config/createEnvConfig'
import { getSecrets } from '#config/getSecrets'
import { createI18n } from '#i18n/createI18n'
import { initI18n } from '#i18n/initI18n'
import { createLogger } from '#logger/createLogger'
import { applyMiddlewares } from '#middlewares/applyMiddlewares'
import { createErrorHandler } from '#middlewares/createErrorHandler'
import { createNotFoundHandler } from '#middlewares/createNotFoundHandler'
import { BaseServerEnvSchema } from '#schemas/base/BaseServerEnvSchema'
import { type EnvSchema } from '#types/env/EnvSchema'
import { type InferEnv } from '#types/env/InferEnv'
import { type BaseURLOptions } from '#types/http/BaseURLOptions'
import { type MiddlewareOptions } from '#types/middlewares/MiddlewareOptions'
import { getBaseUrl } from '#utils/http/getBaseUrl'

/**
 * **MergedEnv**
 *
 * Combines the base TrackPlay environment schema (`BaseServerEnvSchema`)
 * with a service-specific schema.
 */
type MergedEnv<TEnvSchema extends EnvSchema | undefined = undefined> = InferEnv<typeof BaseServerEnvSchema> &
  (TEnvSchema extends EnvSchema ? InferEnv<TEnvSchema> : Record<string, never>)

/**
 * **EnvSecretsBundle**
 *
 * Represents a resolved combination of environment variables and secrets.
 */
interface EnvSecretsBundle<TEnvSchema> {
  env: TEnvSchema
  secrets: Record<string, string>
}

/**
 * Merges the base TrackPlay schema with a service-specific one.
 */
const mergeEnvSchemas = <Extra extends EnvSchema>(extra?: Extra) =>
  ({
    ...BaseServerEnvSchema,
    ...(extra ?? {}),
  }) satisfies EnvSchema

/**
 * Loads and validates environment variables and Docker secrets.
 *
 * @param envSchema - Zod schema defining environment structure.
 * @param secrets - Optional list of secret file names to load.
 */
const loadEnvAndSecrets = <TEnvSchema extends EnvSchema>(
  envSchema: TEnvSchema,
  secrets?: string[],
): EnvSecretsBundle<MergedEnv<TEnvSchema>> => {
  const env = createEnvConfig({ server: mergeEnvSchemas(envSchema) }) as MergedEnv<TEnvSchema>
  const resolvedSecrets = secrets?.length ? getSecrets(...secrets) : {}
  return { env, secrets: resolvedSecrets }
}

/**
 * **RuntimeConfig**
 *
 * Internal representation of the prepared runtime context
 * (environment, secrets, logger, i18n, etc.).
 */
interface RuntimeConfig<TEnvSchema extends Record<string, unknown>> extends EnvSecretsBundle<TEnvSchema> {
  isDevelopment: boolean
  corsOrigins: string[]
  serverOptions: BaseURLOptions
  logger: Logger
  i18n: i18n
}

const parseCorsOrigins = (raw: string): string[] =>
  raw
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)

/**
 * Prepares runtime dependencies and configuration.
 *
 * - Loads env and secrets.
 * - Initializes logger and i18n.
 * - Computes server options and CORS origins.
 */
const prepareRuntime = async <TEnvSchema extends EnvSchema>(
  envSchema: TEnvSchema,
  secrets: string[] | undefined,
  serviceName: string,
): Promise<RuntimeConfig<MergedEnv<TEnvSchema>>> => {
  const { env, secrets: resolvedSecrets } = loadEnvAndSecrets(envSchema, secrets)
  const isDevelopment = env.NODE_ENV === 'development'
  const corsOrigins = parseCorsOrigins(env.CORS_ORIGINS)

  const serverOptions: BaseURLOptions = {
    protocol: isDevelopment ? 'http' : 'https',
    host: env.HOST,
    port: env.PORT,
  }

  const logger = createLogger({
    isDevelopment,
    label: serviceName,
  })

  const i18n = createI18n()
  await initI18n(i18n)

  return { env, secrets: resolvedSecrets, isDevelopment, corsOrigins, serverOptions, logger, i18n }
}

/**
 * **DependencyLayers**
 *
 * Defines the shape of dependency layers in the hexagonal architecture.
 */
interface DependencyLayers {
  adapters: Record<string, unknown>
  services: Record<string, unknown>
  useCases: Record<string, unknown>
  controllers: Record<string, unknown>
}

/**
 * **DependencyFactories**
 *
 * Factory functions for constructing each dependency layer in order.
 */
interface DependencyFactories<TEnvSchema, TLayers extends DependencyLayers> {
  adapters: (ctx: EnvSecretsBundle<TEnvSchema>) => TLayers['adapters']
  services: (ctx: { adapters: TLayers['adapters'] }) => TLayers['services']
  useCases: (ctx: { services: TLayers['services'] }) => TLayers['useCases']
  controllers: (ctx: { useCases: TLayers['useCases'] }) => TLayers['controllers']
}

/**
 * Builds dependency layers in sequence using provided factories.
 */
const buildDependencies = <TEnvSchema, TLayers extends DependencyLayers>(
  factories: DependencyFactories<TEnvSchema, TLayers>,
  ctx: EnvSecretsBundle<TEnvSchema>,
): TLayers => {
  const adapters = factories.adapters(ctx)
  const services = factories.services({ adapters })
  const useCases = factories.useCases({ services })
  const controllers = factories.controllers({ useCases })
  return { adapters, services, useCases, controllers } as TLayers
}

/**
 * **HttpServerOptions**
 *
 * Configuration for initializing an HTTP server instance.
 */
interface HttpServerOptions<Controllers> {
  routes: (app: Express, deps: { controllers: Controllers }) => void
  controllers: Controllers
  i18n: i18n
  logger: Logger
  middlewares?: MiddlewareOptions
}

/**
 * Creates an Express app and attaches routes, middlewares, and handlers.
 */
const createHttpServer = <Controllers extends Record<string, unknown>>(options: HttpServerOptions<Controllers>) => {
  const { routes, controllers, i18n, logger, middlewares = {} } = options
  const app = express()

  applyMiddlewares(app, middlewares)
  routes(app, { controllers })

  app.use(createNotFoundHandler())
  app.use(createErrorHandler(i18n, logger, middlewares.errorHandler))

  const start = (serverOptions: BaseURLOptions): void => {
    app.listen(serverOptions.port, serverOptions.host, () =>
      logger.info(`✅ Server running at ${getBaseUrl(serverOptions)}`),
    )
  }

  return { app, start }
}

/**
 * **BootstrapConfig**
 *
 * Defines configuration parameters for bootstrapping a TrackPlay service.
 */
interface BootstrapConfig<TEnvSchema extends EnvSchema, TLayers extends DependencyLayers> {
  serviceName: string
  envSchema: TEnvSchema
  secrets?: string[]
  dependencyFactories: DependencyFactories<MergedEnv<TEnvSchema>, TLayers>
  routes: (app: Express, container: { controllers: TLayers['controllers'] }) => void
  middlewareOptions?: MiddlewareOptions
}

/**
 * **ServiceRuntime**
 *
 * Represents the fully initialized runtime state of a TrackPlay service.
 */
interface ServiceRuntime<
  TLayers extends DependencyLayers,
  TEnvSchema extends Record<string, unknown> = Record<string, unknown>,
> extends EnvSecretsBundle<TEnvSchema> {
  app: Express
  start: () => void
  logger: Logger
  i18n: i18n
  container: TLayers
  isDevelopment: boolean
}

/**
 * **bootstrap**
 *
 * Unified entrypoint for initializing and launching a TrackPlay service.
 *
 * ### Flow
 * 1. Load and validate env + secrets.
 * 2. Initialize logger, i18n, and runtime context.
 * 3. Build dependency layers (adapters → services → useCases → controllers).
 * 4. Create and configure the Express app.
 * 5. Return runtime context with `start()` ready.
 *
 * @throws Logs and terminates process on unrecoverable setup errors.
 */
export const bootstrap = async <TEnvSchema extends EnvSchema, TLayers extends DependencyLayers>(
  options: BootstrapConfig<TEnvSchema, TLayers>,
): Promise<ServiceRuntime<TLayers, MergedEnv<TEnvSchema>>> => {
  const { serviceName, envSchema, secrets, dependencyFactories, routes, middlewareOptions } = options

  try {
    const runtime = await prepareRuntime(envSchema, secrets, serviceName)

    const container = buildDependencies(dependencyFactories, {
      env: runtime.env,
      secrets: runtime.secrets,
    })

    const { app, start } = createHttpServer({
      routes,
      controllers: container.controllers,
      i18n: runtime.i18n,
      logger: runtime.logger,
      middlewares: {
        cors: { origin: runtime.corsOrigins, credentials: true },
        errorHandler: { isDevelopment: runtime.isDevelopment },
        ...middlewareOptions,
      },
    })

    return {
      app,
      start: () => start(runtime.serverOptions),
      logger: runtime.logger,
      i18n: runtime.i18n,
      env: runtime.env,
      secrets: runtime.secrets,
      container,
      isDevelopment: runtime.isDevelopment,
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? `${error.message}\n${error.stack ?? ''}`.trim() : String(error)
    console.error(`💥 Bootstrap failed for service "${serviceName}":\n${message}`)
    process.exit(1)
  }
}
