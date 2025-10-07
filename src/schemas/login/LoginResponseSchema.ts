import { TokenPairSchema } from '../token/TokenPairSchema.js'
import { z } from 'zod'

/**
 * **LoginResponseSchema**
 *
 * Zod schema defining the **standard response payload** returned by
 * the authentication service upon successful login.
 *
 * ### Purpose
 * Represents the output of the login operation, encapsulating the
 * signed **access** and **refresh** tokens within a single object.
 *
 * ### Structure
 * - `tokens`: A validated {@link TokenPairSchema} containing:
 *   - `accessToken`: Short-lived JWT for authenticated API access.
 *   - `refreshToken`: Long-lived JWT for renewing access tokens.
 *
 * @see {@link TokenPairSchema}
 */
export const LoginResponseSchema = z.object({
  tokens: TokenPairSchema,
})
