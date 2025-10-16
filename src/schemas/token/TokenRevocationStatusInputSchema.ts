import { z } from 'zod'
import { JWTJtiSchema } from '../jwt/JWTJtiSchema.ts'

/**
 * **TokenRevocationStatusInputSchema**
 *
 * Zod schema defining the **input payload** used to verify whether
 * a given JWT has been revoked (i.e., blacklisted).
 *
 * ### Purpose
 * Used primarily in refresh or diagnostic endpoints to determine if
 * a token identified by its `jti` (JWT ID) has already been invalidated.
 *
 * ### Structure
 * - `jti`: A validated {@link JWTJtiSchema} (UUID string) uniquely identifying the token.
 *
 * @see {@link JWTJtiSchema}
 */
export const TokenRevocationStatusInputSchema = z.object({
  jti: JWTJtiSchema,
})
