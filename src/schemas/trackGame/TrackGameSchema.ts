import { z } from 'zod'
import { IdSchema } from '../base/IdSchema.ts'

export const TrackGameSchema = z.object({
  userId: IdSchema,
  gameId: IdSchema,
  status: z.enum(['wishlist', 'playing', 'completed', 'dropped']),
  rating: z.number().int().min(1).max(10),
  notes: z.string().max(1000),
})
