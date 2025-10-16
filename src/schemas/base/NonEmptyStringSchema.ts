import { z } from 'zod'

/**
 * **NonEmptyStringSchema**
 *
 * Zod schema validating that a value is a non-empty string.
 *
 * ### Purpose
 * Used for fields where an empty string (`""`) is not allowed,
 * such as names, slugs, identifiers, or required text inputs.
 *
 * ### Validation Rules
 * - Must be of type **string**.
 * - Must contain **at least one character** (no empty strings).
 *
 */
export const NonEmptyStringSchema = z.string().min(1)
