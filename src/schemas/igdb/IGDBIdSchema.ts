import { PositiveNumberSchema } from '@schemas/index'
import z from 'zod'

/**
 * Zod schema for validating an IGDB ID.
 *
 * Coerces the input to a positive integer.
 * IGDB IDs are numeric and must be greater than zero.
 */
export const IGDBIdSchema = PositiveNumberSchema

export type IGDBId = z.infer<typeof IGDBIdSchema>
