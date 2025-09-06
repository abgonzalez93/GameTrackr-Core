import { PositiveNumberSchema, NonEmptyStringSchema } from '@schemas/index'
import { z } from 'zod'

/**
 * Schema for a numeric string identifier (`sub`).
 */
export const JWTSubSchema = NonEmptyStringSchema.regex(/^\d+$/)

export type JWTSub = z.infer<typeof JWTSubSchema>

/**
 * Schema for a unique JWT ID (`jti`), used for token revocation tracking.
 */
export const JWTJtiSchema = z.uuid()

export type JWTJti = z.infer<typeof JWTJtiSchema>

/**
 * Schema for a UNIX timestamp indicating token expiration (`exp`).
 */
export const JWTExpSchema = PositiveNumberSchema

export type JWTExp = z.infer<typeof JWTExpSchema>

/**
 * Schema for a token types (`typ`).
 */
export const JWTTypSchema = z.enum(['access', 'refresh'])

export type JWTTyp = z.infer<typeof JWTTypSchema>
