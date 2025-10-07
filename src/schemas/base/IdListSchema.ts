import { IdSchema } from './IdSchema.js'
import { z } from 'zod'

/**
 * **IdListSchema**
 *
 * Zod schema validating an array of positive numeric identifiers.
 *
 * ### Validation Rules
 * - Each element must conform to {@link IdSchema} (a positive integer).
 * - Empty arrays are allowed.
 * - Rejects non-numeric or negative values.
 *
 * @see {@link IdSchema} for single identifier validation.
 */
export const IdListSchema = z.array(IdSchema)
