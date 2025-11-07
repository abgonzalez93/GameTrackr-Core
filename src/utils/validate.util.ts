import { z, type ZodType } from 'zod'
import { getTranslationPath } from './translate.util.ts'
import { BadRequestError } from '#errors/http.error'
import { type TrackPlayErrorConstructor } from '#types/error.type'
import { type Translatable } from '#types/translate.type'

const path = getTranslationPath(import.meta.url)

export const validateSchema = <Schema extends ZodType>(
  schema: Schema,
  data: unknown,
  message: string | Translatable = `${path}.invalid_input`,
  ErrorClass: TrackPlayErrorConstructor = BadRequestError,
): z.infer<Schema> => {
  const parsed = schema.safeParse(data)
  if (!parsed.success) throw new ErrorClass(message, z.treeifyError(parsed.error))
  return parsed.data
}
