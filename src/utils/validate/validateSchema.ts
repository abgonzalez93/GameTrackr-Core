import { z, type ZodType } from 'zod'
import { BadRequestError } from '#errors/http/BadRequestError'
import { type ErrorClassConstructor } from '#types/error/ErrorClassConstructor'
import { type Translatable } from '#types/translate/Translatable'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

/**
 * Validates and parses unknown input data against a given {@link ZodType} schema.
 *
 * ### Responsibilities
 * - Performs safe runtime validation using {@link ZodType.safeParse}.
 * - Returns fully typed and trusted data when validation succeeds.
 * - Throws a customizable domain-level error (defaults to {@link BadRequestError})
 *   when validation fails, embedding both a translatable message and detailed context.
 *
 * ### Notes
 * - This helper acts as the standard validation entry point across controllers and use cases.
 * - The default error class (`BadRequestError`) maps to HTTP 400 responses.
 * - Custom error classes can be provided to fit specific domain contexts.
 *
 * @typeParam Schema - The Zod schema type being used for validation.
 *
 * @param schema - Zod schema that defines the expected data structure.
 * @param data - Raw or unknown data to be validated.
 * @param message - Optional translation key or string describing the validation error.
 * @param ErrorClass - Optional custom error class constructor (default: {@link BadRequestError}).
 *
 * @returns The validated and typed data as inferred from the schema.
 *
 * @throws {ErrorClass} When validation fails, including detailed validation context.
 *
 */
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
