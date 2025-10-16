import { z } from 'zod'
import { GameSchema } from './GameSchema.ts'

/**
 * **GameListSchema**
 *
 * Zod schema representing a **list of normalized game entities**.
 *
 * ### Purpose
 * Provides a strongly typed and validated array structure for collections
 * of {@link GameSchema} objects. This schema is typically used as the return
 * type for search results, provider queries, or bulk synchronization operations.
 *
 * ### Behavior
 * - Ensures all elements conform to the {@link GameSchema} structure.
 * - Supports zero-length arrays (an empty result set is valid).
 * - Used in both the domain layer and provider adapters to validate
 *   the consistency of aggregated game data.
 *
 * @see {@link GameSchema}
 */
export const GameListSchema = z.array(GameSchema)
