import { PositiveNumberSchema } from '@trackplay/core/schemas'
import z from 'zod'

/**
 * Zod schema for validating an entity identifier.
 */
export const GameIdSchema = PositiveNumberSchema

export type GameId = z.infer<typeof GameIdSchema>
