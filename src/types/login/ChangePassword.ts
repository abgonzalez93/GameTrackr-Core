import { ChangePasswordSchema } from '#schemas/login/ChangePasswordSchema'
import { z } from 'zod'

/**
 * **ChangePassword**
 *
 * Type alias inferred from {@link ChangePasswordSchema}.
 *
 * Represents the validated input structure for a **password change request**.
 * Used when a user updates their credentials while authenticated.
 *
 * ### Responsibilities
 * - Ensure the presence of a valid `userId`.
 * - Enforce strong password requirements (minimum length, non-empty).
 * - Provide a standardized structure for update operations in authentication flows.
 *
 * ### Notes
 * - Used primarily in account management or profile settings features.
 * - Typically validated before passing into the corresponding use case or service layer.
 *
 * @see {@link ChangePasswordSchema}
 */
export type ChangePassword = z.infer<typeof ChangePasswordSchema>
