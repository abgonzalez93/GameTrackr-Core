import { UserEmailSchema } from '#schemas/user/UserEmailSchema'
import { z } from 'zod'

/**
 * **UserEmail**
 *
 * Type alias inferred from {@link UserEmailSchema}.
 *
 * Represents a validated and normalized email address for a TrackPlay user.
 * This type ensures the email:
 * - Follows standard email format conventions.
 * - Is lowercased and trimmed.
 * - Is not disposable or temporary.
 *
 * ### Responsibilities
 * - Guarantee email normalization before persistence or authentication.
 * - Prevent registration with known disposable domains.
 * - Provide a reusable, validated type for all user-related schemas.
 *
 * @see {@link UserEmailSchema}
 * @see {@link CreateUser}
 * @see {@link PublicUser}
 */
export type UserEmail = z.infer<typeof UserEmailSchema>
