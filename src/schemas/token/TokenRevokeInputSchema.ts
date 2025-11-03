import { z } from 'zod'
import { JWTExpSchema } from '../jwt/JWTExpSchema.ts'
import { JWTJtiSchema } from '../jwt/JWTJtiSchema.ts'

export const TokenRevokeInputSchema = z.object({
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})
