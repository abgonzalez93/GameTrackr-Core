import { IdSchema } from '@schemas/shared'
import { z } from 'zod'

/**
 * Zod schema for tracking a game by a user.
 */
export const TrackGameSchema = z.object({
  userId: IdSchema,
  gameId: IdSchema,
  status: z.enum(['wishlist', 'playing', 'completed', 'dropped']),
  rating: z.number().int().min(1).max(10),
  notes: z.string().max(1000),
})

export type TrackGame = z.infer<typeof TrackGameSchema>
