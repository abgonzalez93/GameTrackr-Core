import { TrackGameSchema } from '#schemas/trackGame/TrackGameSchema'
import { z } from 'zod'

/**
 * **TrackGame**
 *
 * Type alias inferred from {@link TrackGameSchema}.
 *
 * Represents a **user–game relationship** used to track a game's status,
 * rating, and personal notes within the TrackPlay ecosystem.
 *
 * ### Responsibilities
 * - Define the structure for tracking a user’s interaction with a specific game.
 * - Support features like wishlists, progress tracking, and personal ratings.
 * - Serve as a validated DTO for persistence or API communication.
 *
 * ### Fields
 * - `userId`: Identifier of the user who tracks the game.
 * - `gameId`: Identifier of the tracked game.
 * - `status`: Current play state — one of `"wishlist"`, `"playing"`, `"completed"`, `"dropped"`.
 * - `rating`: Integer rating from 1 to 10 given by the user.
 * - `notes`: Optional user notes or comments (max 1000 chars).
 *
 * @see {@link TrackGameSchema}
 */
export type TrackGame = z.infer<typeof TrackGameSchema>
