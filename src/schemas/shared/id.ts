import { PositiveNumberSchema } from '@schemas/shared'
import z from 'zod'

/**
 * Schema for validating a positive numeric identifier.
 *
 * This schema ensures that all IDs are strictly positive integers,
 * and serves as the base type for entity identifiers across the domain.
 *
 */
export const IdSchema = PositiveNumberSchema

/**
 * Schema for validating a list of positive numeric identifiers.
 */
export const IdListSchema = z.array(IdSchema)

export type Id = z.infer<typeof IdSchema>
export type IdList = z.infer<typeof IdListSchema>
