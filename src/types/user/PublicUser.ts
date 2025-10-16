import { z } from 'zod'
import { PublicUserSchema } from '#schemas/user/PublicUserSchema'

/**
 * **PublicUser**
 *
 * Type alias inferred from {@link PublicUserSchema}.
 *
 * Represents the **public-facing view** of a user profile within TrackPlay.
 * This type is safe to expose to client applications or third-party consumers
 * — it excludes any sensitive or internal-only fields.
 *
 * ### Responsibilities
 * - Define the subset of user data visible to other users or external APIs.
 * - Enforce safe serialization for frontend consumption.
 * - Maintain structural consistency across user-related endpoints.
 *
 * ### Fields
 * - `id`: Unique user identifier.
 * - `email`: Publicly displayed or contact-safe email address.
 * - `username`: Public handle used for identification and search.
 * - `name`: Optional display name.
 * - `avatarUrl`: Optional profile picture URL.
 * - `bio`: Optional short biography (max 280 characters).
 *
 * @see {@link PublicUserSchema}
 * @see {@link AdminUser}
 */
export type PublicUser = z.infer<typeof PublicUserSchema>
