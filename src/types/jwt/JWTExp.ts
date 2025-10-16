import { z } from 'zod'
import { JWTExpSchema } from '#schemas/jwt/JWTExpSchema'

/**
 * **JWTExp**
 *
 * Type alias inferred from {@link JWTExpSchema}.
 *
 * Represents the **UNIX timestamp (in seconds)** indicating the expiration time
 * of a JSON Web Token (JWT), as defined by the `exp` claim in the JWT standard (RFC 7519).
 *
 * ### Responsibilities
 * - Define a strongly typed numeric representation of token expiration.
 * - Ensure all token lifetimes are validated as positive integers.
 *
 * ### Notes
 * - Commonly used in token rotation, revocation, and validation workflows.
 * - Must always represent **absolute epoch time**, not relative durations.
 *
 * @see {@link JWTExpSchema}
 */
export type JWTExp = z.infer<typeof JWTExpSchema>
