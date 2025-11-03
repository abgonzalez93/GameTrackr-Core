import { z } from 'zod'
import { JWTSubSchema } from '../jwt/JWTSubSchema.ts'

export const TokenGenerateInputSchema = z.object({
  sub: JWTSubSchema,
})
