import { z } from 'zod'

/**
 * **TokenRevocationStatusSchema**
 *
 * Zod schema defining the **output payload** that reports whether
 * a given JWT token has been revoked.
 *
 * ### Purpose
 * Represents the standardized response returned by endpoints
 * that check the revocation state of a token (e.g., `/auth/revoked`).
 *
 * ### Structure
 * - `revoked`: A boolean flag indicating whether the token has been blacklisted.
 *
 */
export const TokenRevocationStatusSchema = z.object({
  revoked: z.boolean(),
})
