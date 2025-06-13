import { PositiveNumberSchema } from '@schemas/shared'
import z from 'zod'

/**
 * Zod schema for validating a User ID.
 *
 * Coerces the input to a positive integer.
 * User IDs must be numeric and greater than zero.
 */
export const UserIdSchema = PositiveNumberSchema

export type UserId = z.infer<typeof UserIdSchema>
