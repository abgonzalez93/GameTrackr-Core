import { parseConfig } from './parseConfig.ts'
import { EnvValidationError } from '#errors/config/EnvValidationError'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type ConfigValues } from '#types/config/ConfigValues'
import { type InferConfig } from '#types/config/InferConfig'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const buildEnvConfig = <Schema extends ConfigSchema>(
  schema: Schema,
  env: ConfigValues,
  label: 'server' | 'client',
): InferConfig<Schema> => {
  return parseConfig(schema, env, { path, ErrorClass: EnvValidationError, label })
}
