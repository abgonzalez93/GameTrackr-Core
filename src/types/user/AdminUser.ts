import { z } from 'zod'
import { AdminUserSchema } from '#schemas/user/AdminUserSchema'

/**
 * **AdminUser**
 *
 * Type alias inferred from {@link AdminUserSchema}.
 *
 * Represents an **internal or administrative view** of a user within TrackPlay.
 * This type extends the public-facing user data with sensitive or management-only
 * properties, such as account status and timestamps.
 *
 * ### Responsibilities
 * - Provide a complete representation of user data for internal use.
 * - Support administrative tools, dashboards, and service-side logic.
 * - Extend {@link PublicUser} with audit and permission fields.
 *
 * ### Fields
 * - `isAdmin`: Whether the user has administrative privileges.
 * - `isActive`: Whether the account is active and allowed to log in.
 * - `createdAt`: ISO timestamp indicating when the user was created.
 * - `updatedAt`: ISO timestamp of the last user update.
 * - `lastLoginAt`: Optional ISO timestamp of the most recent login.
 *
 * @see {@link AdminUserSchema}
 * @see {@link PublicUser}
 */
export type AdminUser = z.infer<typeof AdminUserSchema>
