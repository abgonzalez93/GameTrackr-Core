import { z } from 'zod'
import { IdListSchema } from '../base/IdListSchema.ts'
import { IdSchema } from '../base/IdSchema.ts'

export const GameSchema = z.object({
  id: IdSchema.optional(),
  providerIds: z.object({
    igdb: IdSchema.nullable().optional(),
    rawg: IdSchema.nullable().optional(),
  }),
  title: z.string(),
  slug: z.string(),
  summary: z.string().nullable().optional(),
  storyline: z.string().nullable().optional(),
  rating: z.number().nullable().optional(),
  aggregated_rating: z.number().nullable().optional(),
  total_rating: z.number().nullable().optional(),
  hypes: z.number().int().nullable().optional(),
  first_release_date: z.date().nullable().optional(),
  cover: z.number().int().nullable().optional(),
  genres: IdListSchema.optional(),
  platforms: IdListSchema.optional(),
  themes: IdListSchema.optional(),
  url: z.url().nullable().optional(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
})
