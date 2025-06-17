import { JWTSubjectSchema, JWTIDSchema, JWTExpSchema } from './JWTCommon'
import { z } from 'zod'

/**
 * Zod schema for validating the payload required to rotate a refresh token.
 *
 * Includes the user ID (`sub`), token identifier (`jti`), and expiration timestamp (`exp`).
 */
export const RefreshTokenRotationInputSchema = z.object({
  sub: JWTSubjectSchema,
  jti: JWTIDSchema,
  exp: JWTExpSchema,
})
export type RefreshTokenRotationInput = z.infer<typeof RefreshTokenRotationInputSchema>
