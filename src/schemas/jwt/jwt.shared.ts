import { PositiveNumberSchema, NonEmptyStringSchema } from '@schemas/index'
import { z } from 'zod'

/**
 * Schema for a numeric string identifier (`sub`).
 */
export const JWTSubSchema = NonEmptyStringSchema.regex(/^\d+$/)

/**
 * Schema for a unique JWT ID (`jti`), used for token revocation tracking.
 */
export const JWTJtiSchema = z.string().uuid()

/**
 * Schema for a UNIX timestamp indicating token expiration (`exp`).
 */
export const JWTExpSchema = PositiveNumberSchema

/**
 * Schema for a token types (`typ`).
 */
export const JWTTypSchema = z.enum(['access', 'refresh'])
