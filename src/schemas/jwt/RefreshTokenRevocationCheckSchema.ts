import { JWTIDSchema } from './JWTCommon'
import { z } from 'zod'

/**
 * Zod schema for validating the `jti` query parameter when checking token revocation.
 *
 * `jti` must be a valid UUID string.
 */
export const RefreshTokenRevocationCheckSchema = z.object({
  jti: JWTIDSchema,
})
export type RefreshTokenRevocationCheck = z.infer<typeof RefreshTokenRevocationCheckSchema>
