import { TokenPairSchema } from '#schemas/token/TokenPairSchema'
import { z } from 'zod'

/**
 * **TokenPair**
 *
 * Type alias inferred from {@link TokenPairSchema}.
 *
 * Represents a **pair of signed JWT tokens** — an access token and a refresh token —
 * returned after successful authentication or token rotation.
 *
 * ### Responsibilities
 * - Provide the cryptographic credentials required for API authentication.
 * - Support both short-lived access tokens and long-lived refresh tokens.
 * - Serve as the standardized response type for {@link TokenUseCase.generateTokens}.
 *
 * ### Notes
 * - The `accessToken` is used for authenticated API requests.
 * - The `refreshToken` is used to obtain new access tokens once the current one expires.
 * - Both tokens are opaque strings (typically signed using JOSE).
 *
 * @see {@link TokenPairSchema}
 */
export type TokenPair = z.infer<typeof TokenPairSchema>
