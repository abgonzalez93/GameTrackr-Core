import { JWTSubSchema, JWTExpSchema, JWTJtiSchema, NonEmptyStringSchema } from '@schemas/index'
import { z } from 'zod'

/**
 * Input schema to generate new JWT tokens.
 * Used by backend when requesting new access+refresh pair.
 */
export const TokenGenerationInputSchema = z.object({
  sub: JWTSubSchema,
})

export type TokenGenerationInput = z.infer<typeof TokenGenerationInputSchema>

/**
 * Input schema to revoke a refresh token.
 */
export const RefreshTokenRevokeInputSchema = z.object({
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})

export type RefreshTokenRevokeInput = z.infer<typeof RefreshTokenRevokeInputSchema>

/**
 * Input schema to check if a refresh token was revoked.
 */
export const RefreshTokenRevocationCheckSchema = z.object({
  jti: JWTJtiSchema,
})

export type RefreshTokenRevocationCheck = z.infer<typeof RefreshTokenRevocationCheckSchema>

/**
 * Input schema to rotate a refresh token.
 */
export const RefreshTokenRotationInputSchema = z.object({
  sub: JWTSubSchema,
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})

export type RefreshTokenRotationInput = z.infer<typeof RefreshTokenRotationInputSchema>

/**
 * Output schema indicating if a refresh token was revoked.
 */
export const RefreshTokenRevocationResponseSchema = z.object({
  revoked: z.boolean(),
})

export type RefreshTokenRevocationResponse = z.infer<typeof RefreshTokenRevocationResponseSchema>

/**
 * Output schema for pair of signed tokens.
 */
export const SignedTokenPairSchema = z.object({
  accessToken: NonEmptyStringSchema,
  refreshToken: NonEmptyStringSchema,
})

export type SignedTokenPair = z.infer<typeof SignedTokenPairSchema>
