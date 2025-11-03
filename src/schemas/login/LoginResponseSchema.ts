import { z } from 'zod'
import { TokenPairSchema } from '../token/TokenPairSchema.ts'

export const LoginResponseSchema = z.object({
  tokens: TokenPairSchema,
})
