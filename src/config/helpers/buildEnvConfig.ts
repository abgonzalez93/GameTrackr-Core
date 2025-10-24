import { parseConfig } from './parseConfig.ts'
import { EnvValidationError } from '#errors/config/EnvValidationError'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type ConfigValues } from '#types/config/ConfigValues'
import { type InferConfig } from '#types/config/InferConfig'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

/**
 * **buildEnvConfig**
 *
 * Parses, validates, and normalizes a given environment configuration
 * based on a provided Zod schema.
 *
 * This function is a thin wrapper around {@link parseConfig}, specialized
 * for environment configuration validation. It automatically applies
 * the correct translation path and injects the {@link EnvValidationError}
 * as the default error type for standardized reporting.
 *
 * ### Responsibilities
 * - Validate environment variables against a given {@link ConfigSchema}.
 * - Produce a type-safe object inferred via {@link InferConfig}.
 * - Attach contextual metadata (label + translation path) for clear errors.
 * - Throw an {@link EnvValidationError} with detailed issue information if validation fails.
 *
 * ### Parameters
 * | Name | Type | Description |
 * |------|------|-------------|
 * | `schema` | {@link ConfigSchema} | Zod-based schema defining expected environment variables. |
 * | `env` | {@link ConfigValues} | Raw key–value pairs extracted from `process.env` or equivalent source. |
 * | `label` | `'server' \| 'client'` | Context label used to identify which environment segment failed validation. |
 *
 * ### Throws
 * {@link EnvValidationError} — if one or more environment variables are missing or invalid.
 *
 * @template Schema - Zod schema defining environment variable structure.
 * @param schema - Zod schema for the environment configuration.
 * @param env - Raw environment key–value pairs to validate.
 * @param label - Indicates whether the config belongs to the "server" or "client".
 * @returns A validated and strongly typed configuration object.
 *
 * @see {@link EnvValidationError}
 * @see {@link parseConfig}
 */
export const buildEnvConfig = <Schema extends ConfigSchema>(
  schema: Schema,
  env: ConfigValues,
  label: 'server' | 'client',
): InferConfig<Schema> => {
  return parseConfig(schema, env, { path, ErrorClass: EnvValidationError, label })
}
