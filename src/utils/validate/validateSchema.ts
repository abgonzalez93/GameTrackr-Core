import { z, type ZodType } from 'zod'
import { BadRequestError } from '#errors/http/BadRequestError'
import { type ErrorClassConstructor } from '#types/error/ErrorClassConstructor'
import { type Translatable } from '#types/translate/Translatable'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const validateSchema = <Schema extends ZodType>(
  schema: Schema,
  data: unknown,
  message: string | Translatable = `${path}.invalid_input`,
  ErrorClass: ErrorClassConstructor = BadRequestError,
): z.infer<Schema> => {
  const parsed = schema.safeParse(data)
  if (!parsed.success) throw new ErrorClass(message, z.treeifyError(parsed.error))
  return parsed.data
}
