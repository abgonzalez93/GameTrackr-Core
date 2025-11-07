import { z } from 'zod'
import { PositiveNumberSchema, IdSchema, IdListSchema } from './base.schema.ts'

export const CreateGameSchema = z.object({
  id: PositiveNumberSchema,
  name: z.string().min(1),
  summary: z.string().nullable().optional(),
  coverUrl: z.url().nullable().optional(),
  releaseDate: z.coerce.date().nullable().optional(),
  genres: z.array(z.string()),
  platforms: z.array(z.string()),
})

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

export const GameListSchema = z.array(GameSchema)
