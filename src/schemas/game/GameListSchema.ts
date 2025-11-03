import { z } from 'zod'
import { GameSchema } from './GameSchema.ts'

export const GameListSchema = z.array(GameSchema)
