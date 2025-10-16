import { z } from 'zod'
import { ChangeUsernameSchema } from '#schemas/login/ChangeUsernameSchema'

/**
 * **ChangeUsername**
 *
 * Type alias inferred from {@link ChangeUsernameSchema}.
 *
 * Represents the validated input structure for a **username change request**.
 * Used when an authenticated user updates their public username.
 *
 * ### Responsibilities
 * - Ensure the presence of a valid `userId`.
 * - Enforce minimum username requirements (length, valid characters, uniqueness).
 * - Provide a standardized DTO for username update flows.
 *
 * ### Notes
 * - Typically consumed by account management or profile update endpoints.
 * - Validated at the boundary layer before passing to a corresponding use case or service.
 *
 * @see {@link ChangeUsernameSchema}
 */
export type ChangeUsername = z.infer<typeof ChangeUsernameSchema>
