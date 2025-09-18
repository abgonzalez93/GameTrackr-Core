import { GameIdSchema } from './GameId'
import { z } from 'zod'

const GameIdArray = z.array(GameIdSchema)

/**
 * Neutral schema for a Game entity.
 * Independent of IGDB, RAWG, Steam, etc.
 */
export const GameSchema = z.object({
  igdb_id: GameIdSchema,
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
  genres: GameIdArray.optional(),
  platforms: GameIdArray.optional(),
  themes: GameIdArray.optional(),
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
