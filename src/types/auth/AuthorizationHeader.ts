import { z } from 'zod'
import { AuthorizationHeaderSchema } from '#schemas/auth/AuthorizationHeaderSchema'

/**
 * **AuthorizationHeader**
 *
 * Type alias inferred from {@link AuthorizationHeaderSchema}.
 *
 * Represents the expected format of the HTTP `Authorization` header
 * used in JWT-based authentication within TrackPlay services.
 *
 * ### Notes
 * - Enforced by {@link AuthorizationHeaderSchema}, which validates
 *   the `"Bearer <JWT>"` pattern using a regular expression.
 * - Used across authentication middlewares and token controllers.
 *
 * @see {@link AuthorizationHeaderSchema}
 */
export type AuthorizationHeader = z.infer<typeof AuthorizationHeaderSchema>
