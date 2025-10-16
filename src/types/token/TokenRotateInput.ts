import { z } from 'zod'
import { TokenRotateInputSchema } from '#schemas/token/TokenRotateInputSchema'

/**
 * **TokenRotateInput**
 *
 * Type alias inferred from {@link TokenRotateInputSchema}.
 *
 * Represents the **input payload** used to perform a secure refresh token rotation.
 * This structure is consumed by {@link TokenUseCase.rotateTokens} and the
 * corresponding API endpoint (`POST /rotate`).
 *
 * ### Responsibilities
 * - Provide all JWT claims required for rotation:
 *   - `sub`: Subject (user identifier).
 *   - `exp`: Expiration timestamp (UNIX time).
 *   - `jti`: Unique token identifier for revocation tracking.
 * - Enable the application to revoke the old token and issue a new token pair atomically.
 *
 * ### Notes
 * - Rotation enforces **single-use refresh tokens**, preventing replay attacks.
 * - The old token’s `jti` is immediately blacklisted upon rotation.
 * - The `sub` claim is reused to issue a fresh token pair for the same user.
 *
 * @see {@link TokenRotateInputSchema}
 * @see {@link TokenUseCase.rotateTokens}
 */
export type TokenRotateInput = z.infer<typeof TokenRotateInputSchema>
