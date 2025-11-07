import { EnvValidationError } from '#errors/config.error'
import type { ConfigSchema, ConfigValues, InferConfig } from '#types/config.type'
import { type TrackPlayErrorConstructor } from '#types/error.type'
import { t, getTranslationPath } from '#utils/translate.util'
import { validateSchema } from '#utils/validate.util'

const path = getTranslationPath(import.meta.url)

interface ParseConfigOptions<ErrorType extends TrackPlayErrorConstructor> {
  path: string
  ErrorClass: ErrorType
  label: string
}

export const parseConfig = <Schema extends ConfigSchema, ErrorType extends TrackPlayErrorConstructor>(
  schema: Schema,
  values: ConfigValues,
  options: ParseConfigOptions<ErrorType>,
): InferConfig<Schema> => {
  const { label, path, ErrorClass } = options
  const message = t(`${path}.invalid_configuration`, { section: label })

  return validateSchema(schema, values, message, ErrorClass)
}

export const buildEnvConfig = <Schema extends ConfigSchema>(
  schema: Schema,
  env: ConfigValues,
  label: 'server' | 'client',
): InferConfig<Schema> => {
  return parseConfig(schema, env, { path, ErrorClass: EnvValidationError, label })
}

export const normalizeEnvValues = (source: ConfigValues, emptyAsUndefined: boolean): ConfigValues => {
  const normalized: ConfigValues = {}

  for (const [key, value] of Object.entries(source)) {
    const upperKey = key.toUpperCase()
    const normalizedValue = emptyAsUndefined && value === '' ? undefined : value
    normalized[upperKey] = normalizedValue
  }

  return normalized
}
