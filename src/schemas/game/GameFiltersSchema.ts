import { z } from 'zod'

export const GameFiltersSchema = z.object({
  query: z.string().optional(),
  limit: z.number().min(1).max(50).optional(),
  offset: z.number().min(0).optional(),
  sortBy: z.enum(['title', 'releaseDate', 'rating']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  minRating: z.number().min(0).max(100).optional(),
  genres: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
  themes: z.array(z.string()).optional(),
})
