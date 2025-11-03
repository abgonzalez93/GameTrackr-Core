import { z } from 'zod'
import { TokenPairSchema } from '#schemas/token/TokenPairSchema'

export type TokenPair = z.infer<typeof TokenPairSchema>
