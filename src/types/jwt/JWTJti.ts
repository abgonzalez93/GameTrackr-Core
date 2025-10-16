import { z } from 'zod'
import { JWTJtiSchema } from '#schemas/jwt/JWTJtiSchema'

/**
 * **JWTJti**
 *
 * Type alias inferred from {@link JWTJtiSchema}.
 *
 * Represents the **unique identifier (JTI claim)** assigned to a JSON Web Token (JWT),
 * as defined by the [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7) standard.
 *
 * ### Responsibilities
 * - Provide a globally unique identifier for each issued token.
 * - Enable token revocation and one-time-use validation through blacklists.
 *
 * ### Notes
 * - Always a **UUID-formatted string** (`z.uuid()`).
 * - Commonly used in refresh token rotation and revocation tracking.
 * - Serves as the primary key for blacklist operations in {@link BlacklistService}.
 *
 * @see {@link JWTJtiSchema}
 */
export type JWTJti = z.infer<typeof JWTJtiSchema>
