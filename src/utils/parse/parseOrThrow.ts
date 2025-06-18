import { BadRequestError } from '@errors/index'
import { ZodTypeAny } from 'zod'

/**
 * Parses and validates data using a Zod schema.
 * Throws a customizable error if validation fails.
 *
 * @template T - Inferred type from the schema
 * @param schema - Zod schema to validate against
 * @param data - Raw data to be validated
 * @param message - Optional custom error message
 * @param ErrorClass - Optional custom error class to throw (default: BadRequestError)
 * @returns The parsed and typed data
 * @throws ErrorClass If validation fails
 */
export const parseOrThrow = <T>(
  schema: ZodTypeAny,
  data: unknown,
  message = 'Invalid input',
  ErrorClass: new (message: string, details?: unknown) => Error = BadRequestError,
): T => {
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    const details = parsed.error.flatten?.() ?? parsed.error
    throw new ErrorClass(message, details)
  }

  return parsed.data
}
