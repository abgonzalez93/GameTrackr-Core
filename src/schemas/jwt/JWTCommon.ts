import { PositiveNumberSchema } from '../shared/index'
import { z } from 'zod'

/**
 * Zod schema for a JWT subject (`sub`), representing the user ID as a stringified positive integer.
 */
export const JWTSubjectSchema = z
  .string()
  .regex(/^\d+$/, { message: 'sub must be a numeric string representing a user ID' })

/**
 * Zod schema for a JWT ID (jti).
 */
export const JWTIDSchema = z.string().uuid({ message: 'jti must be a valid UUID' })

/**
 * Zod schema for a JWT expiration timestamp (exp).
 */
export const JWTExpSchema = PositiveNumberSchema
