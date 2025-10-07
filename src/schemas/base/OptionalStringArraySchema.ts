import { z } from 'zod'

/**
 * **OptionalStringArraySchema**
 *
 * Zod schema validating an optional array of non-empty strings.
 *
 * ### Purpose
 * Used for fields that may contain a list of string values (e.g., tags, IDs, filters),
 * but can also be omitted entirely.
 *
 * ### Validation Rules
 * - Each element must be a **non-empty string** (`min(1)`).
 * - The entire array is **optional** (i.e., may be `undefined`).
 * - Empty arrays (`[]`) are allowed, but empty strings within are not.
 *
 */
export const OptionalStringArraySchema = z.array(z.string().min(1)).optional()
