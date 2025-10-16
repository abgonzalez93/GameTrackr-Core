import { z } from 'zod'
import { TokenRevocationStatusInputSchema } from '#schemas/token/TokenRevocationStatusInputSchema'

/**
 * **TokenRevocationStatusInput**
 *
 * Type alias inferred from {@link TokenRevocationStatusInputSchema}.
 *
 * Represents the **input payload** used to verify whether a refresh token
 * has been revoked (blacklisted) in the system.
 *
 * ### Responsibilities
 * - Provide the unique JWT identifier (`jti`) required for revocation lookup.
 * - Serve as the validated input structure for {@link TokenUseCase.isRefreshTokenRevoked}.
 * - Maintain strict type safety across validation and application layers.
 *
 * ### Notes
 * - The `jti` (JWT ID) uniquely identifies each issued token.
 * - Used by diagnostic or rotation endpoints to enforce one-time-use refresh logic.
 *
 * @see {@link TokenRevocationStatusInputSchema}
 */
export type TokenRevocationStatusInput = z.infer<typeof TokenRevocationStatusInputSchema>
