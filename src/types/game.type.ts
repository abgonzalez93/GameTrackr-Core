import { z } from 'zod'
import { CreateGameSchema, GameFiltersSchema, GameListSchema, GameSchema } from '#schemas/game.schema'

export type CreateGame = z.infer<typeof CreateGameSchema>
export type Game = z.infer<typeof GameSchema>
export type GameFilters = z.infer<typeof GameFiltersSchema>
export type GameList = z.infer<typeof GameListSchema>
