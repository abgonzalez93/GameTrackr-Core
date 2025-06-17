import { TokenJtiSchema } from './TokenCommon'
import { z } from 'zod'

/**
 * Zod schema for validating the `jti` query parameter when checking token revocation.
 *
 * `jti` must be a valid UUID string.
 */
export const IsRevokedSchema = z.object({
  jti: TokenJtiSchema,
})

export type IsRevoked = z.infer<typeof IsRevokedSchema>
