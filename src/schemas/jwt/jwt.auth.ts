import { JWTSubSchema, JWTExpSchema, JWTJtiSchema } from './jwt.shared.js'
import { NonEmptyStringSchema } from '../shared/shared.js'
import { z } from 'zod'

/**
 * Input schema to generate new JWT tokens (access + refresh pair).
 */
export const TokenGenerateInputSchema = z.object({
  sub: JWTSubSchema,
})
export type TokenGenerateInput = z.infer<typeof TokenGenerateInputSchema>

/**
 * Input schema to revoke a refresh token.
 */
export const TokenRevokeInputSchema = z.object({
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})
export type TokenRevokeInput = z.infer<typeof TokenRevokeInputSchema>

/**
 * Input schema to check the revocation status of a token.
 */
export const TokenRevocationStatusInputSchema = z.object({
  jti: JWTJtiSchema,
})
export type TokenRevocationStatusInput = z.infer<typeof TokenRevocationStatusInputSchema>

/**
 * Input schema to rotate a refresh token.
 */
export const TokenRotateInputSchema = z.object({
  sub: JWTSubSchema,
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})
export type TokenRotateInput = z.infer<typeof TokenRotateInputSchema>

/**
 * Output schema indicating if a token has been revoked.
 */
export const TokenRevocationStatusSchema = z.object({
  revoked: z.boolean(),
})
export type TokenRevocationStatus = z.infer<typeof TokenRevocationStatusSchema>

/**
 * Output schema for pair of signed tokens.
 */
export const TokenPairSchema = z.object({
  accessToken: NonEmptyStringSchema,
  refreshToken: NonEmptyStringSchema,
})
export type TokenPair = z.infer<typeof TokenPairSchema>
