import { z } from 'zod'
import { NonEmptyStringSchema } from '../base/NonEmptyStringSchema.ts'

/**
 * **TokenPairSchema**
 *
 * Zod schema defining the **output payload** for a pair of signed JWT tokens.
 *
 * ### Purpose
 * Represents the standard structure returned by token generation operations
 * (e.g., login, refresh, or rotation). Both tokens are validated as
 * non-empty strings to ensure they contain signed JWTs.
 *
 * ### Structure
 * - `accessToken`: Short-lived JWT used for API authentication.
 * - `refreshToken`: Long-lived JWT used to renew the access token.
 *
 * @see {@link NonEmptyStringSchema}
 */
export const TokenPairSchema = z.object({
  accessToken: NonEmptyStringSchema,
  refreshToken: NonEmptyStringSchema,
})
