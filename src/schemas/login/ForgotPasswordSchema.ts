import { z } from 'zod'
import { UserEmailSchema } from '../user/UserEmailSchema.ts'

/**
 * **ForgotPasswordSchema**
 *
 * Zod schema for validating a **forgot password request**.
 *
 * ### Purpose
 * Ensures the incoming payload contains a valid and properly formatted
 * user email address. This schema is typically used during the
 * password recovery flow to trigger a reset token or recovery email.
 *
 * ### Behavior
 * - `email`: Must satisfy the validation rules of {@link UserEmailSchema},
 *   including RFC-compliant formatting and non-empty constraints.
 *
 * @see {@link UserEmailSchema}
 */
export const ForgotPasswordSchema = z.object({
  email: UserEmailSchema,
})
