import { CreateUserSchema } from '#schemas/user/CreateUserSchema'
import { z } from 'zod'

/**
 * **CreateUser**
 *
 * Type alias inferred from {@link CreateUserSchema}.
 *
 * Represents the validated input required to create a new user account
 * within the TrackPlay ecosystem. Used primarily by registration endpoints
 * or onboarding workflows.
 *
 * ### Responsibilities
 * - Ensure that user registration data is structurally and semantically valid.
 * - Enforce password strength and confirmation consistency.
 * - Normalize optional fields such as `bio` and `avatarUrl`.
 *
 * ### Fields
 * - `email`: Valid, non-disposable email address.
 * - `name`: Optional display name (nullable).
 * - `username`: Unique login identifier (validated via {@link UserNameSchema}).
 * - `password`: Secure password meeting strength requirements.
 * - `passwordConfirm`: Confirmation field (must match `password`).
 * - `avatarUrl`: Optional profile image URL.
 * - `bio`: Optional short biography (max 280 characters).
 *
 * @see {@link CreateUserSchema}
 * @see {@link UserNameSchema}
 * @see {@link UserEmailSchema}
 */
export type CreateUser = z.infer<typeof CreateUserSchema>
