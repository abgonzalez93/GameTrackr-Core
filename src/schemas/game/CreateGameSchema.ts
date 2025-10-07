import { PositiveNumberSchema } from '../base/PositiveNumberSchema.js'
import { z } from 'zod'

/**
 * **CreateGameSchema**
 *
 * Zod schema defining the payload required to **create a new game entity**.
 *
 * ### Purpose
 * Provides a normalized and validated input structure for inserting
 * or registering a new game in the system, independent of provider source.
 *
 * ### Behavior
 * - Validates that:
 *   - `id` is a positive integer (via {@link PositiveNumberSchema}).
 *   - `name` is a non-empty string.
 *   - `summary` is optional and may be `null`.
 *   - `coverUrl` is an optional or nullable valid URL.
 *   - `releaseDate` is coerced to a JavaScript `Date` (nullable/optional).
 *   - `genres` and `platforms` are arrays of non-empty strings.
 * - Ensures consistent and clean game creation data across all adapters.
 *
 * @see {@link PositiveNumberSchema}
 */
export const CreateGameSchema = z.object({
  id: PositiveNumberSchema,
  name: z.string().min(1),
  summary: z.string().nullable().optional(),
  coverUrl: z.url().nullable().optional(),
  releaseDate: z.coerce.date().nullable().optional(),
  genres: z.array(z.string()),
  platforms: z.array(z.string()),
})
