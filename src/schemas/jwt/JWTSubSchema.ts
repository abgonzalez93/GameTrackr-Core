import { NonEmptyStringSchema } from '../base/NonEmptyStringSchema.js'

/**
 * **JWTSubSchema**
 *
 * Zod schema representing the **JWT Subject (`sub`) claim**, which identifies
 * the principal (user or entity) to whom the token belongs.
 *
 * ### Purpose
 * Ensures the `sub` field is a **non-empty numeric string**, providing a
 * consistent format for user or entity identifiers across all issued tokens.
 *
 * ### Behavior
 * - Must be a string containing only digits (`"0"`–`"9"`).
 * - Rejects empty strings or non-numeric values.
 * - Commonly maps to a user’s internal numeric ID within the system.
 *
 * @see {@link NonEmptyStringSchema}
 */
export const JWTSubSchema = NonEmptyStringSchema.regex(/^\d+$/)
