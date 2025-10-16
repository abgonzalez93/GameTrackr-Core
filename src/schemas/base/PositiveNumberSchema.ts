import { z } from 'zod'

/**
 * **PositiveNumberSchema**
 *
 * Zod schema validating that a value is a **positive integer number**.
 *
 * ### Purpose
 * Ensures numeric values (e.g., ports, durations, counts) are valid,
 * automatically coercing inputs (such as string numbers) into integers.
 *
 * ### Validation Rules
 * - Coerces input into a number (`z.coerce.number()`).
 * - Must be a valid integer (`.int()`).
 * - Must be strictly positive (`.positive()`).
 *
 */
export const PositiveNumberSchema = z.coerce.number().int().positive()
