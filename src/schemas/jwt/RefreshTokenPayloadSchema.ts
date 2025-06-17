import { TokenSubSchema, TokenJtiSchema, TokenExpSchema } from './TokenCommon'
import { z } from 'zod'

/**
 * Zod schema for validating the payload required to rotate a refresh token.
 *
 * Includes the user ID (`sub`), token identifier (`jti`), and expiration timestamp (`exp`).
 */
export const RefreshTokenPayloadSchema = z.object({
  sub: TokenSubSchema,
  jti: TokenJtiSchema,
  exp: TokenExpSchema,
})

export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>
