import { JWTSubSchema } from '#schemas/jwt/JWTSubSchema'
import { z } from 'zod'

/**
 * **JWTSub**
 *
 * Type alias inferred from {@link JWTSubSchema}.
 *
 * Represents the **subject claim (`sub`)** of a JSON Web Token (JWT),
 * typically corresponding to the **unique identifier of the user or entity**
 * that the token refers to — as defined by the
 * [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2) specification.
 *
 * ### Responsibilities
 * - Identify the principal (e.g., user ID) to whom the token was issued.
 * - Maintain a consistent numeric string format across all TrackPlay services.
 * - Enable traceability and correlation between tokens and their owners.
 *
 * ### Notes
 * - Always a **numeric string**, validated via `^\d+$` pattern.
 * - Used throughout authentication and authorization layers.
 * - Commonly included in {@link TokenGenerateInputSchema}.
 *
 * @see {@link JWTSubSchema}
 */
export type JWTSub = z.infer<typeof JWTSubSchema>
