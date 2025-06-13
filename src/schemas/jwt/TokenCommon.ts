import { PositiveNumberSchema } from '../shared/index'
import { z } from 'zod'

/**
 * Zod schema for a JWT subject (sub).
 *
 * Must be a string representing a positive integer.
 */
export const TokenSubSchema = z.object({
  sub: z.string().regex(/^\d+$/, { message: 'sub must be a numeric string' }),
})

/**
 * Zod schema for a JWT ID (jti).
 *
 * Must be a valid UUID v4 string.
 */
export const TokenJtiSchema = z.object({
  jti: z.string().uuid({ message: 'jti must be a valid UUID' }),
})

/**
 * Zod schema for a JWT expiration timestamp (exp).
 *
 * Must be a positive integer representing UNIX time in seconds.
 */
export const TokenExpSchema = z.object({
  exp: PositiveNumberSchema,
})
