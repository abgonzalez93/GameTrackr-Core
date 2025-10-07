import { IdSchema } from '../base/IdSchema.js'
import { z } from 'zod'

/**
 * **CategorySchema**
 *
 * Zod schema defining a normalized **category entity**.
 *
 * ### Purpose
 * Represents a general-purpose category used across different
 * provider domains — such as **genres**, **platforms**, or **themes** —
 * in a unified, provider-agnostic format.
 *
 * ### Behavior
 * - Ensures each category includes:
 *   - `id`: a positive numeric identifier validated by {@link IdSchema}.
 *   - `name`: a non-empty string representing the display name.
 *   - `slug`: a URL-friendly string identifier.
 * - Used to normalize provider-specific data structures (e.g., IGDB, RAWG).
 *
 * @see {@link IdSchema}
 */
export const CategorySchema = z.object({
  id: IdSchema,
  name: z.string(),
  slug: z.string(),
})
