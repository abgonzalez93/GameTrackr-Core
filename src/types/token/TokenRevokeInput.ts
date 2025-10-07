import { TokenRevokeInputSchema } from '#schemas/token/TokenRevokeInputSchema'
import { z } from 'zod'

/**
 * **TokenRevokeInput**
 *
 * Type alias inferred from {@link TokenRevokeInputSchema}.
 *
 * Represents the **input payload** required to revoke (blacklist) a refresh token.
 * This structure is typically consumed by {@link TokenUseCase.revokeRefreshToken}
 * or the corresponding API endpoint (`POST /revoke`).
 *
 * ### Responsibilities
 * - Provide the token’s unique identifier (`jti`) and expiration time (`exp`).
 * - Serve as validated data for adding a token to the blacklist.
 * - Support precise TTL (time-to-live) calculations based on expiration.
 *
 * ### Notes
 * - The token’s `exp` field defines when it naturally expires (UNIX timestamp).
 * - The `jti` uniquely identifies the token instance for revocation tracking.
 * - Used in logout and rotation flows to ensure tokens cannot be reused.
 *
 * @see {@link TokenRevokeInputSchema}
 */
export type TokenRevokeInput = z.infer<typeof TokenRevokeInputSchema>
