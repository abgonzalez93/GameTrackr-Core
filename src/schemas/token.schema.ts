import { z } from 'zod'
import { NonEmptyStringSchema } from './base.schema.ts'
import { JWTSubSchema, JWTExpSchema, JWTJtiSchema } from './jwt.schema.ts'

export const TokenGenerateInputSchema = z.object({
  sub: JWTSubSchema,
})

export const TokenPairSchema = z.object({
  accessToken: NonEmptyStringSchema,
  refreshToken: NonEmptyStringSchema,
})

export const TokenRevocationStatusInputSchema = z.object({
  jti: JWTJtiSchema,
})

export const TokenRevocationStatusSchema = z.object({
  revoked: z.boolean(),
})

export const TokenRevokeInputSchema = z.object({
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})

export const TokenRotateInputSchema = z.object({
  sub: JWTSubSchema,
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})
