import { IdSchema, IdListSchema } from '@schemas/shared'
import { z } from 'zod'

/**
 * Neutral schema for a Game entity.
 * Independent of IGDB, RAWG, Steam, etc.
 */
export const GameSchema = z.object({
  ids: z.object({
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
  provider: z.enum(['igdb', 'rawg', 'steam']),
  url: z.url().nullable().optional(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
})

/**
 * Schema for a list of games.
 */
export const GameListSchema = z.array(GameSchema)

export type Game = z.infer<typeof GameSchema>
export type GameList = z.infer<typeof GameListSchema>
