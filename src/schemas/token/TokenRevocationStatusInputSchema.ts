import { z } from 'zod'
import { JWTJtiSchema } from '../jwt/JWTJtiSchema.ts'

export const TokenRevocationStatusInputSchema = z.object({
  jti: JWTJtiSchema,
})
