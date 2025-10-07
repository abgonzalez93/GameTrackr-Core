import { JWTExpSchema } from '../jwt/JWTExpSchema.js'
import { JWTJtiSchema } from '../jwt/JWTJtiSchema.js'
import { z } from 'zod'

/**
 * **TokenRevokeInputSchema**
 *
 * Zod schema defining the **input payload** used to revoke a refresh token.
 *
 * ### Purpose
 * Represents the minimal data required to invalidate a refresh token
 * by adding its unique identifier (`jti`) to the blacklist until its
 * expiration time (`exp`).
 *
 * ### Structure
 * - `exp`: Expiration timestamp (UNIX time, in seconds) from {@link JWTExpSchema}.
 * - `jti`: Unique JWT identifier (UUID) from {@link JWTJtiSchema}.
 *
 * @see {@link JWTExpSchema}
 * @see {@link JWTJtiSchema}
 */
export const TokenRevokeInputSchema = z.object({
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})
