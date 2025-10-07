import { PositiveNumberSchema } from '../base/PositiveNumberSchema.js'

/**
 * **JWTExpSchema**
 *
 * Zod schema representing a **UNIX timestamp** (in seconds) used to denote
 * the expiration time of a JSON Web Token (`exp` claim).
 *
 * ### Purpose
 * Provides a reusable validation rule for all JWT payloads that include
 * an expiration timestamp, ensuring the value is:
 * - A positive integer.
 * - Expressed in **seconds since epoch** (UTC).
 *
 * ### Behavior
 * - Accepts only positive integers (e.g., `1712345678`).
 * - Rejects non-integer, negative, or malformed values.
 *
 * @see {@link PositiveNumberSchema}
 */
export const JWTExpSchema = PositiveNumberSchema
