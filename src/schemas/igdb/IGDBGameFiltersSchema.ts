import { IGDB } from '@constants/index'
import { z } from 'zod'

/**
 * Creates a Zod schema that accepts a string or string[] and transforms it into number[].
 *
 * @returns Zod schema with transformation
 */
const zStringOrStringArrayToNumberArray = () =>
  z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .transform((arr) => arr.map(Number))

/**
 * Schema for IGDB game filtering, sorting and pagination options.
 * Accepts query params as strings and converts them to numbers automatically.
 */
export const IGDBGameFiltersSchema = z.object({
  q: z.string().optional(),

  limit: z.coerce.number().min(1).max(IGDB.MAX_GAME_LIMIT).optional(),
  offset: z.coerce.number().min(0).optional(),

  sortBy: z.enum(IGDB.SORT_FIELDS).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),

  minRating: z.coerce.number().min(0).max(100).optional(),
  minAggregatedRating: z.coerce.number().min(0).max(100).optional(),
  minFollows: z.coerce.number().min(0).optional(),
  minHypes: z.coerce.number().min(0).optional(),

  genres: zStringOrStringArrayToNumberArray().optional(),
  platforms: zStringOrStringArrayToNumberArray().optional(),
  themes: zStringOrStringArrayToNumberArray().optional(),
})

export type IGDBGameFilters = z.infer<typeof IGDBGameFiltersSchema>
