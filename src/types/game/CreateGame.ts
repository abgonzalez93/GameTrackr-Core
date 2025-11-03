import { z } from 'zod'
import { CreateGameSchema } from '#schemas/game/CreateGameSchema'

export type CreateGame = z.infer<typeof CreateGameSchema>
