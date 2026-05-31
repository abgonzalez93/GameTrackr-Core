import { z } from 'zod'
import { RequiredString } from './common.schema.ts'
import { JWTSubSchema, JWTExpSchema, JWTJtiSchema } from './jwt.schema.ts'

export const TokenGenerateInputSchema = z.object({
  sub: JWTSubSchema,
})

export const TokenPairSchema = z.object({
  accessToken: RequiredString,
  refreshToken: RequiredString,
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
