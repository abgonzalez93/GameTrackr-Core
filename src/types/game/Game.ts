import { z } from 'zod'
import { GameSchema } from '#schemas/game/GameSchema'

export type Game = z.infer<typeof GameSchema>
