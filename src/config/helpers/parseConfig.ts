import { z } from 'zod'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type ConfigValues } from '#types/config/ConfigValues'
import { type InferConfig } from '#types/config/InferConfig'
import { type ErrorClassConstructor } from '#types/error/ErrorClassConstructor'
import { t } from '#utils/translate/t'

interface ParseConfigOptions<ErrorType extends ErrorClassConstructor> {
  path: string
  ErrorClass: ErrorType
  label: string
}

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
