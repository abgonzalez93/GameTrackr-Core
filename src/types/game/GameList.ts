import { z } from 'zod'
import { GameListSchema } from '#schemas/game/GameListSchema'

export type GameList = z.infer<typeof GameListSchema>
