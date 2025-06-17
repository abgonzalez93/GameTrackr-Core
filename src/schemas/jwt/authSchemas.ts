import { RefreshTokenPayloadSchema, AccessTokenPayloadSchema } from './jwt'
import { NonEmptyStringSchema } from '@schemas/index'
import z from 'zod'

/**
 * Schema for generating new access and refresh tokens.
 */
export const TokenGenerationInputSchema = AccessTokenPayloadSchema.pick({ sub: true })

export type TokenGenerationInput = z.infer<typeof TokenGenerationInputSchema>

/**
 * Schema for revoking a refresh token.
 */
export const RefreshTokenRevokeInputSchema = RefreshTokenPayloadSchema.pick({ jti: true, exp: true })

export type RefreshTokenRevokeInput = z.infer<typeof RefreshTokenRevokeInputSchema>

/**
 * Schema for checking if a refresh token has been revoked.
 */
export const RefreshTokenRevocationCheckSchema = RefreshTokenPayloadSchema.pick({ jti: true })

export type RefreshTokenRevocationCheck = z.infer<typeof RefreshTokenRevocationCheckSchema>

/**
 * Schema for rotating a refresh token.
 */
export const RefreshTokenRotationInputSchema = RefreshTokenPayloadSchema.pick({ jti: true, exp: true, sub: true })

export type RefreshTokenRotationInput = z.infer<typeof RefreshTokenRotationInputSchema>

/**
 * Schema for the response returned when checking the revocation status of a refresh token.
 */
export const RefreshTokenRevocationResponseSchema = z.object({ revoked: z.boolean() })

export type RefreshTokenRevocationResponse = z.infer<typeof RefreshTokenRevocationResponseSchema>

/**
 * Schema for a pair of access and refresh tokens.
 */
export const SignedTokenPairSchema = z.object({
  accessToken: NonEmptyStringSchema,
  refreshToken: NonEmptyStringSchema,
})
export type SignedTokenPair = z.infer<typeof SignedTokenPairSchema>
