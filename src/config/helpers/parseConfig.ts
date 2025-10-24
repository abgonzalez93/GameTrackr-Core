import { z } from 'zod'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type ConfigValues } from '#types/config/ConfigValues'
import { type InferConfig } from '#types/config/InferConfig'
import { type ErrorClassConstructor } from '#types/error/ErrorClassConstructor'
import { t } from '#utils/translate/t'

interface ParseConfigOptions<ErrorType extends ErrorClassConstructor> {
  /** Translation path base used to construct i18n-aware error messages. */
  path: string
  /** Custom error class used for structured exception handling. */
  ErrorClass: ErrorType
  /** Label to identify the validated section (e.g. `"server"`, `"client"`, `"secrets"`). */
  label: string
}

/**
 * **parseConfig**
 *
 * Generic utility responsible for parsing and validating configuration objects
 * (such as environment variables or secrets) using Zod schemas.
 *
 * It provides a unified validation pipeline across the TrackPlay ecosystem,
 * enabling consistent error formatting, translation, and strong typing.
 *
 * ### Responsibilities
 * - Validate input data (`values`) against a provided {@link ConfigSchema}.
 * - Return a strongly typed object inferred via {@link InferConfig}.
 * - Generate standardized, localized error messages using {@link t}.
 * - Throw a domain-specific error (e.g. {@link EnvValidationError}) when validation fails.
 *
 * ### Parameters
 * | Name | Type | Description |
 * |------|------|-------------|
 * | `schema` | {@link ConfigSchema} | The Zod schema describing the expected structure. |
 * | `values` | {@link ConfigValues} | Raw key–value pairs to validate (e.g., from `process.env`). |
 * | `options` | {@link ParseConfigOptions} | Metadata including translation path, label, and error class. |
 *
 * ### Throws
 * - A custom error instance (via `ErrorClass`) containing:
 *   - A translated message (`t(path + '.invalid_configuration')`)
 *   - A detailed list of Zod validation issues (`{ path, message }`).
 *
 * @template Schema - Zod schema defining configuration structure.
 * @template ErrorType - Error class used to handle validation failures.
 * @param schema - The configuration schema to validate against.
 * @param values - Raw key–value pairs (e.g., from environment variables).
 * @param options - Configuration metadata including translation path and error class.
 * @returns A validated, type-safe configuration object.
 *
 * @see {@link ConfigSchema}
 * @see {@link InferConfig}
 * @see {@link EnvValidationError}
 * @see {@link t}
 */
export const parseConfig = <Schema extends ConfigSchema, ErrorType extends ErrorClassConstructor>(
  schema: Schema,
  values: ConfigValues,
  options: ParseConfigOptions<ErrorType>,
): InferConfig<Schema> => {
  if (!schema) return {} as InferConfig<Schema>

  const result = schema.safeParse(values)
  if (result.success) return result.data as InferConfig<Schema>

  const { label, path, ErrorClass } = options
  const message = t(`${path}.invalid_configuration`, { section: label })

  throw new ErrorClass(message, z.treeifyError(result.error))
}
