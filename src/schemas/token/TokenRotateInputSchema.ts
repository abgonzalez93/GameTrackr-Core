import { z } from 'zod'
import { JWTExpSchema } from '../jwt/JWTExpSchema.ts'
import { JWTJtiSchema } from '../jwt/JWTJtiSchema.ts'
import { JWTSubSchema } from '../jwt/JWTSubSchema.ts'

export const TokenRotateInputSchema = z.object({
  sub: JWTSubSchema,
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})
