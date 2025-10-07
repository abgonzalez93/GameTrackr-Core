import { IdSchema } from '../base/IdSchema.js'
import { z } from 'zod'

/**
 * **ChangeUsernameSchema**
 *
 * Zod schema for validating a **username change request**.
 *
 * ### Purpose
 * Ensures that the payload includes both a valid user identifier and a
 * sufficiently long new username.
 *
 * ### Behavior
 * - `userId`: Must be a valid positive integer, validated via {@link IdSchema}.
 * - `newUsername`: Must be a non-empty string with a **minimum length of 3** characters.
 * - Does **not** enforce character restrictions (e.g., alphanumeric only),
 *   leaving that to higher-level domain validation if necessary.
 *
 * @see {@link IdSchema}
 */
export const ChangeUsernameSchema = z.object({
  userId: IdSchema,
  newUsername: z.string().min(3),
})
