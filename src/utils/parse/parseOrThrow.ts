import { TranslationParams } from '@utils/index'
import { BadRequestError } from '@errors/index'
import { CorePath } from '@i18n/index'
import z, { ZodType } from 'zod'

const path: CorePath = 'core.utils.parse.parseOrThrow.invalid_input'

/**
 * Parses and validates data using a Zod schema.
 * Throws a customizable error if validation fails.
 *
 * @param schema - Zod schema to validate against
 * @param data - Raw data to be validated
 * @param message - Custom error message
 * @param ErrorClass - Optional custom error class to throw (default: BadRequestError)
 * @returns The parsed and typed data
 * @throws ErrorClass if validation fails
 */
export const parseOrThrow = <TSchema extends ZodType>(
  schema: TSchema,
  data: unknown,
  message: string | TranslationParams = path,
  ErrorClass: new (message: string | TranslationParams, details?: unknown) => Error = BadRequestError,
): z.infer<TSchema> => {
  const parsed = schema.safeParse(data)
  if (!parsed.success) throw new ErrorClass(message, z.treeifyError(parsed.error))
  return parsed.data
}
