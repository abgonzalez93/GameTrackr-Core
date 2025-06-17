import { TokenJtiSchema, TokenExpSchema } from './TokenCommon'
import { z } from 'zod'

/**
 * Schema for revoking a refresh token.
 * Validates the `jti` (JWT ID) and the expiration timestamp (`exp`) in seconds.
 */
export const RevokeTokenSchema = z.object({
  jti: TokenJtiSchema,
  exp: TokenExpSchema,
})

export type RevokeToken = z.infer<typeof RevokeTokenSchema>
