import { IdSchema } from '../base/IdSchema.js'
import { z } from 'zod'

/**
 * **ChangePasswordSchema**
 *
 * Zod schema for validating a **password change request**.
 *
 * ### Purpose
 * Ensures that the request contains a valid user identifier and a secure,
 * non-trivial password string with a minimum length requirement.
 *
 * ### Behavior
 * - `userId`: Must be a positive integer validated by {@link IdSchema}.
 * - `newPassword`: Must be a string with **at least 8 characters**.
 * - Does not enforce advanced password rules (e.g., symbols, case mix)
 *   — those can be layered on top if needed.
 *
 * @see {@link IdSchema}
 */
export const ChangePasswordSchema = z.object({
  userId: IdSchema,
  newPassword: z.string().min(8),
})
