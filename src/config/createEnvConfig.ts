import { createEnv } from '@t3-oss/env-core'
import z, { type ZodType } from 'zod'

type EnvSchema = Record<string, ZodType>

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
 *
 * @see {@link createEnvConfig}
 */
interface EnvConfigOptions<Server extends EnvSchema | undefined, Client extends EnvSchema | undefined> {
  /**
   * Zod schema defining the **server-side environment variables**.
   * These remain private and are not exposed to the frontend.
   */
  server?: Server

  /**
   * Zod schema defining the **client-side environment variables**.
   * Only include values safe for public exposure.
   */
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
   * Defaults to the global `process.env`.
   */
  runtimeEnv?: NodeJS.ProcessEnv

  /**
   * Whether empty strings should be interpreted as `undefined`.
   *
   * @default true
   */
  emptyStringAsUndefined?: boolean
}

/**
 * **InferEnv**
 *
 * Infers the TypeScript type from a given Zod environment schema.
 *
 * Used internally to derive precise typing for both `server` and `client`
 * environment variables without manual duplication.
 */
type InferEnv<S extends EnvSchema | undefined> = S extends EnvSchema ? z.infer<z.ZodObject<S>> : Record<string, never>

/**
 * **EnvConfigReturn**
 *
 * Merges inferred types for both server and client environment schemas.
 * This ensures that `createEnvConfig` returns a unified, type-safe object
 * representing all validated environment variables.
 */
type EnvConfigReturn<Server extends EnvSchema | undefined, Client extends EnvSchema | undefined> = InferEnv<Server> &
  InferEnv<Client>

/**
 * **createEnvConfig**
 *
 * Factory utility for defining a **type-safe environment configuration**
 * across both backend and frontend contexts.
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
 * @see {@link EnvConfigOptions}
 * @see {@link https://env.t3.gg/docs/core | T3 Env Documentation}
 */
export const createEnvConfig = <
  Server extends EnvSchema | undefined = undefined,
  Client extends EnvSchema | undefined = undefined,
>(
  options: EnvConfigOptions<Server, Client>,
): EnvConfigReturn<Server, Client> => {
  const { server, client, clientPrefix = 'NEXT_PUBLIC_', runtimeEnv = process.env, emptyStringAsUndefined = true } = options

  const base = {
    server: server ?? {},
    runtimeEnv,
    emptyStringAsUndefined,
  }

  return createEnv(client ? { ...base, client, clientPrefix } : base) as EnvConfigReturn<Server, Client>
}
