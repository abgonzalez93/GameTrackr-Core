import { TokenRevocationStatusSchema } from '#schemas/token/TokenRevocationStatusSchema'
import { z } from 'zod'

/**
 * **TokenRevocationStatus**
 *
 * Type alias inferred from {@link TokenRevocationStatusSchema}.
 *
 * Represents the **revocation state** of a given refresh token.
 * This structure is typically returned by the {@link TokenUseCase.isRefreshTokenRevoked}
 * method or the corresponding HTTP endpoint (`GET /revoked`).
 *
 * ### Responsibilities
 * - Indicate whether a token has been revoked (blacklisted) or remains valid.
 * - Provide a simple, standardized format for API responses and internal checks.
 * - Serve as a diagnostic or security measure within token lifecycle management.
 *
 * ### Notes
 * - A `revoked: true` value means the token has been blacklisted (logout or rotation).
 * - Used in token rotation flows to prevent reuse of invalidated refresh tokens.
 *
 * @see {@link TokenRevocationStatusSchema}
 */
export type TokenRevocationStatus = z.infer<typeof TokenRevocationStatusSchema>
