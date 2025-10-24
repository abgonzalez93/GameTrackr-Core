import { type GetEnvOptions } from './GetEnvOptions.ts'
import { buildEnvConfig } from './helpers/buildEnvConfig.ts'
import { normalizeEnvValues } from './helpers/normalizeEnvValues.ts'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type InferConfig } from '#types/config/InferConfig'

/**
 * **getServerEnv**
 *
 * Extracts, normalizes, and validates **server-side environment variables**
 * based on a strongly typed {@link ConfigSchema}.
 *
 * This utility provides a safe and consistent mechanism to load backend-only
 * configuration values (e.g., database URLs, API keys, or service endpoints)
 * without exposing them to the client.
 *
 * ### Responsibilities
 * - Read environment variables from `process.env` or a custom source.
 * - Normalize empty string values to `undefined` (configurable).
 * - Validate values against the provided Zod schema.
 * - Return an immutable, type-safe configuration object.
 *
 * ### Parameters
 * | Name | Type | Description |
 * |------|------|-------------|
 * | `schema` | {@link ConfigSchema} | Zod schema defining the expected environment variables. |
 * | `options` | {@link GetEnvOptions} | Runtime configuration (source and normalization behavior). |
 *
 * ### Notes
 * - Designed for backend services only; use {@link getClientEnv} for public variables.
 * - All returned values are validated and immutable.
 * - Automatically throws a {@link EnvValidationError} on invalid configuration.
 *
 * @template Server - Zod schema defining expected server environment variables.
 * @param schema - The schema describing required environment variables.
 * @param options - Optional configuration for environment normalization and source.
 * @returns A readonly, validated environment configuration object.
 *
 * @see {@link GetEnvOptions}
 * @see {@link buildEnvConfig}
 * @see {@link normalizeEnvValues}
 */
export const getServerEnv = <Server extends ConfigSchema>(
  schema: Server,
  options?: GetEnvOptions,
): Readonly<InferConfig<Server>> => {
  const { runtimeEnv = process.env, emptyStringAsUndefined = true } = options ?? {}

  const env = normalizeEnvValues(runtimeEnv, emptyStringAsUndefined)
  const validated = buildEnvConfig(schema, env, 'server')

  return Object.freeze(validated)
}
