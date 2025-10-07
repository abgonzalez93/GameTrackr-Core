import { PositiveNumberSchema } from './PositiveNumberSchema.js'

/**
 * **IdSchema**
 *
 * Zod schema validating a strictly positive numeric identifier.
 *
 * ### Purpose
 * Used as the canonical type for all entity identifiers
 * across the TrackPlay domain (e.g., `Game`, `Category`, `Platform`).
 *
 * ### Validation Rules
 * - Must be a **number**.
 * - Must be an **integer**.
 * - Must be **greater than 0**.
 *
 * @see {@link PositiveNumberSchema} Base numeric validation logic.
 */
export const IdSchema = PositiveNumberSchema
