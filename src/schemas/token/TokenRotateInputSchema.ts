import { JWTSubSchema } from '../jwt/JWTSubSchema.js'
import { JWTExpSchema } from '../jwt/JWTExpSchema.js'
import { JWTJtiSchema } from '../jwt/JWTJtiSchema.js'
import { z } from 'zod'

/**
 * **TokenRotateInputSchema**
 *
 * Zod schema defining the **input payload** used to perform a **refresh token rotation**.
 *
 * ### Purpose
 * Used to exchange an existing refresh token for a new access + refresh token pair,
 * while ensuring the old token cannot be reused (single-use enforcement).
 *
 * ### Structure
 * - `sub`: Subject identifier (`sub` claim) — typically the user ID, validated by {@link JWTSubSchema}.
 * - `exp`: Expiration timestamp (`exp` claim) — UNIX time in seconds, validated by {@link JWTExpSchema}.
 * - `jti`: Unique token identifier (`jti` claim) — UUID string used for revocation tracking, validated by {@link JWTJtiSchema}.
 *
 * @see {@link JWTSubSchema}
 * @see {@link JWTExpSchema}
 * @see {@link JWTJtiSchema}
 */
export const TokenRotateInputSchema = z.object({
  sub: JWTSubSchema,
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
})
