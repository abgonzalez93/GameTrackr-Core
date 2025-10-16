import { z } from 'zod'
import { IdSchema } from '../base/IdSchema.ts'

/**
 * **TrackGameSchema**
 *
 * Zod schema defining the **user–game relationship** used for tracking progress,
 * wishlist status, personal notes, and ratings.
 *
 * ### Purpose
 * Represents how a user interacts with a specific game in their library —
 * whether they are currently playing it, have completed it, or wish to play it later.
 *
 * ### Structure
 * - `userId`: Unique identifier of the user, validated by {@link IdSchema}.
 * - `gameId`: Unique identifier of the tracked game, validated by {@link IdSchema}.
 * - `status`: Current relationship between the user and the game:
 *   - `"wishlist"` — Added to the user’s wishlist.
 *   - `"playing"` — Currently being played.
 *   - `"completed"` — Finished by the user.
 *   - `"dropped"` — Abandoned or no longer being played.
 * - `rating`: Optional numeric rating (1–10), representing personal enjoyment or quality.
 * - `notes`: Optional short description or comment (max 1000 characters).
 *
 * @see {@link IdSchema}
 */
export const TrackGameSchema = z.object({
  userId: IdSchema,
  gameId: IdSchema,
  status: z.enum(['wishlist', 'playing', 'completed', 'dropped']),
  rating: z.number().int().min(1).max(10),
  notes: z.string().max(1000),
})
