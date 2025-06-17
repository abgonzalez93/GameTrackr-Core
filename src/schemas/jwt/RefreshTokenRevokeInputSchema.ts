import { JWTIDSchema, JWTExpSchema } from './JWTCommon'
import { z } from 'zod'

/**
 * Zod schema for revoking a refresh token.
 *
 * Validates the `jti` (JWT ID) and the expiration timestamp (`exp`) in seconds.
 */
export const RefreshTokenRevokeInputSchema = z.object({
  jti: JWTIDSchema,
  exp: JWTExpSchema,
})
export type RefreshTokenRevokeInput = z.infer<typeof RefreshTokenRevokeInputSchema>
