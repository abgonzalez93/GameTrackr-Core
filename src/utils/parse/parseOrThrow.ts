import { BadRequestError } from '@errors/index'
import { ZodTypeAny } from 'zod'

/**
 * Parses and validates data using a Zod schema.
 * If validation fails, throws a BadRequestError with the error details.
 *
 * @template T - Inferred type from the schema
 * @param schema - Zod schema to validate against
 * @param data - Raw data to be validated
 * @param message - Optional custom error message
 * @returns The parsed and typed data
 * @throws BadRequestError If validation fails
 */
export const parseOrThrow = <T>(schema: ZodTypeAny, data: unknown, message = 'Invalid input'): T => {
  const parsed = schema.safeParse(data)
  if (!parsed.success) throw new BadRequestError(message, parsed.error.flatten())
  return parsed.data
}
