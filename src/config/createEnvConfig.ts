import { z } from 'zod'
import { EnvValidationError } from '#errors/config/EnvValidationError'
import { type EnvSchema } from '#types/env/EnvSchema'
import { type InferEnv } from '#types/env/InferEnv'
import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { t } from '#utils/translate/t'

const path = getTranslationPath(import.meta.url)

/**
 * **EnvValues**
 *
 * Represents the raw key–value pairs extracted from `process.env`.
 * Used as the base source for validation and normalization.
 */
type EnvValues = Record<string, string | undefined>

/**
 * **EnvConfigOptions**
 *
 * Defines configuration parameters for {@link createEnvConfig}, enabling
 * both **server-side** and **client-side** environment validation using Zod.
 *
 * ### Responsibilities
 * - Separate server and client environment schemas.
 * - Control prefix-based exposure for public variables.
 * - Allow testing overrides via a custom `runtimeEnv`.
 * - Normalize empty strings to `undefined` for stricter validation.
 *
 * ### Notes
 * - Server variables remain private to backend services.
 * - Client variables must be explicitly prefixed (e.g., `NEXT_PUBLIC_`).
 * - Empty strings are treated as undefined by default.
 *
 * @template Server - Zod schema defining server-side variables.
 * @template Client - Zod schema defining client-side variables.
 */
interface EnvConfigOptions<
  Server extends EnvSchema | undefined = undefined,
  Client extends EnvSchema | undefined = undefined,
> {
  /** Zod schema defining the **server-side environment variables**. */
  server?: Server

  /** Zod schema defining the **client-side environment variables**. */
  client?: Client

  /**
   * Prefix used to identify client-exposed variables.
   * Defaults to `"NEXT_PUBLIC_"` for Next.js compatibility.
   *
   * @default "NEXT_PUBLIC_"
   */
  clientPrefix?: string

  /**
   * Custom runtime environment source.
   * Defaults to `process.env`.
   */
  runtimeEnv?: EnvValues

  /**
   * Whether empty strings should be interpreted as `undefined`.
   *
   * @default true
   */
  emptyStringAsUndefined?: boolean
}

/**
 * **EnvConfigReturn**
 *
 * Merges inferred types for both server and client environment schemas.
 * Ensures that {@link createEnvConfig} returns a unified, type-safe object.
 *
 * @internal
 */
type EnvConfigReturn<
  Server extends EnvSchema | undefined = undefined,
  Client extends EnvSchema | undefined = undefined,
> = (Server extends EnvSchema ? InferEnv<Server> : Record<string, never>) &
  (Client extends EnvSchema ? InferEnv<Client> : Record<string, never>)

/**
 * **parseEnvSection**
 *
 * Parses and validates a single environment schema section.
 *
 * @param schema - Zod schema defining expected variables.
 * @param values - Raw key-value pairs from the environment.
 * @param label - Optional label to improve error readability.
 * @returns A parsed and validated environment object.
 * @throws {@link EnvValidationError} if validation fails.
 *
 * @internal
 */
const parseEnvSection = <Schema extends EnvSchema | undefined>(
  schema: Schema,
  values: EnvValues,
  label: string,
): InferEnv<Schema> => {
  if (!schema) return {} as InferEnv<Schema>

  const result = z.object(schema).safeParse(values)
  if (result.success) return result.data as InferEnv<Schema>

  const issues = result.error.issues.map((issue) => ({
    path: issue.path.join('.') || '(root)',
    message: issue.message,
  }))

  throw new EnvValidationError(t(`${path}.invalid_configuration`, { section: label }), { issues })
}

/**
 * **createEnvConfig**
 *
 * Validates and merges environment configurations for server and client.
 *
 * ### Responsibilities
 * - Validate environment variables using Zod schemas.
 * - Support both server and client validation flows.
 * - Expose safe client variables with a configurable prefix.
 * - Normalize empty strings to `undefined` to prevent silent failures.
 *
 * @param options - Configuration object defining Zod schemas and runtime options.
 * @returns A validated and type-safe environment configuration object.
 *
 * @throws {@link EnvValidationError} if any section fails validation.
 */
export const createEnvConfig = <
  Server extends EnvSchema | undefined = undefined,
  Client extends EnvSchema | undefined = undefined,
>(
  options: EnvConfigOptions<Server, Client>,
): EnvConfigReturn<Server, Client> => {
  const { server, client, clientPrefix = 'NEXT_PUBLIC_', runtimeEnv = process.env, emptyStringAsUndefined = true } = options

  const env: EnvValues = Object.fromEntries(
    Object.entries(runtimeEnv).map(([key, value]) => [key, emptyStringAsUndefined && value === '' ? undefined : value]),
  )

  const serverData = parseEnvSection(server, env, 'server')

  const clientEnv = Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith(clientPrefix)))
  const clientData = parseEnvSection(client, clientEnv, 'client')

  return { ...serverData, ...clientData } as EnvConfigReturn<Server, Client>
}
