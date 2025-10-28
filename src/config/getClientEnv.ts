import { type GetEnvOptions } from './GetEnvOptions.ts'
import { buildEnvConfig } from './helpers/buildEnvConfig.ts'
import { normalizeEnvValues } from './helpers/normalizeEnvValues.ts'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type ConfigValues } from '#types/config/ConfigValues'
import { type InferConfig } from '#types/config/InferConfig'

/**
 * Filters a set of environment variables by a given prefix.
 */
const filterEnvByPrefix = (source: ConfigValues, prefix: string): ConfigValues =>
  Object.fromEntries(Object.entries(source).filter(([key]) => key.startsWith(prefix)))

/**
 * **GetClientEnvOptions**
 *
 * Extends {@link GetEnvOptions} to include an optional prefix for filtering
 * public environment variables exposed to the client.
 *
 * ### Notes
 * - Only variables starting with the configured `prefix` will be included.
 * - By default, the prefix is `"NEXT_PUBLIC_"` (compatible with Next.js).
 *
 * @see {@link GetEnvOptions}
 */
export interface GetClientEnvOptions extends GetEnvOptions {
  /**
   * Prefix used to identify client-exposed variables.
   *
   * @default "NEXT_PUBLIC_"
   */
  prefix?: string
}

/**
 * **getClientEnv**
 *
 * Extracts, normalizes, and validates environment variables intended for
 * client-side exposure (e.g., through Next.js public runtime config).
 *
 * This function provides a safe mechanism for frontend-bound environment
 * variables by enforcing a naming prefix and schema-based validation.
 *
 * ### Responsibilities
 * - Read raw environment variables from `process.env` or a custom source.
 * - Normalize empty string values to `undefined` if configured.
 * - Filter only variables that start with the given `prefix`.
 * - Validate the filtered environment against a {@link ConfigSchema}.
 * - Return a frozen, type-safe configuration object for the client.
 *
 * ### Parameters
 * | Name | Type | Description |
 * |------|------|-------------|
 * | `schema` | {@link ConfigSchema} | Zod schema defining the shape of client environment variables. |
 * | `options` | {@link GetClientEnvOptions} | Runtime configuration (prefix, normalization, env source). |
 *
 * @template Client - Zod schema defining expected client environment variables.
 * @param schema - The Zod schema to validate client-exposed variables.
 * @param options - Optional configuration for runtime environment, prefix, and normalization.
 * @returns A readonly, validated environment configuration object.
 *
 * @see {@link buildEnvConfig}
 * @see {@link normalizeEnvValues}
 * @see {@link GetEnvOptions}
 */
export const getClientEnv = <Client extends ConfigSchema>(
  schema: Client,
  options?: GetClientEnvOptions,
): Readonly<InferConfig<Client>> => {
  const { runtimeEnv = process.env, emptyStringAsUndefined = true, prefix = 'NEXT_PUBLIC_' } = options ?? {}

  const env = normalizeEnvValues(runtimeEnv, emptyStringAsUndefined)
  const clientEnv = filterEnvByPrefix(env, prefix)
  const validated = buildEnvConfig(schema, clientEnv, 'client')

  return Object.freeze(validated)
}
