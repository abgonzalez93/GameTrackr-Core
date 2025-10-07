import { createEnv } from '@t3-oss/env-core'
import { type ZodType } from 'zod'

type Schema = Record<string, ZodType<unknown>>

/**
 * **EnvConfigOptions**
 *
 * Defines configuration parameters for {@link createEnvConfig}, allowing
 * both **server-side** and **client-side** environment validation using Zod.
 *
 * @template Server - Zod schema defining the shape of server-side environment variables.
 * @template Client - Zod schema defining the shape of client-side environment variables.
 *
 */
interface EnvConfigOptions<Server extends Schema | undefined, Client extends Schema | undefined> {
  /**
   * Zod schema defining the **server-side environment variables**.
   * These variables are only available on the backend.
   */
  server?: Server

  /**
   * Zod schema defining the **client-side environment variables**.
   * Only required when exposing selected variables to the frontend.
   */
  client?: Client

  /**
   * Prefix used to mark client-exposed variables.
   * Defaults to `"NEXT_PUBLIC_"` for Next.js compatibility.
   *
   * @default "NEXT_PUBLIC_"
   */
  clientPrefix?: string

  /**
   * Custom runtime environment object (defaults to `process.env`).
   * Useful for testing or serverless environments.
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
 * **createEnvConfig**
 *
 * Factory utility for defining a **type-safe environment configuration**
 * across both backend and frontend contexts.
 *
 * ### Responsibilities
 * - Validate environment variables using Zod schemas.
 * - Support both server and client configurations.
 * - Optionally expose safe client variables with a prefix (e.g. `NEXT_PUBLIC_`).
 * - Normalize empty strings to `undefined` for stricter validation.
 *
 * @param options - Configuration object defining Zod schemas and runtime options.
 * @returns A validated and type-safe environment configuration object.
 *
 * @see {@link createEnv}
 * @see {@link https://env.t3.gg/docs/core | T3 Env Documentation}
 */
export const createEnvConfig = <
  Server extends Schema | undefined = undefined,
  Client extends Schema | undefined = undefined,
>(
  options: EnvConfigOptions<Server, Client>,
) => {
  const { server, client, clientPrefix = 'NEXT_PUBLIC_', runtimeEnv = process.env, emptyStringAsUndefined = true } = options

  const serverConfig = {
    server: server ?? {},
    runtimeEnv,
    emptyStringAsUndefined,
  }

  return createEnv(client ? { ...serverConfig, client, clientPrefix } : serverConfig)
}
