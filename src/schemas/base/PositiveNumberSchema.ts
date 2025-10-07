import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { z } from 'zod'

const path = getTranslationPath(import.meta.url)

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
 * @translationKeys
 * - `${path}.number_invalid` — When the input is not a number
 * - `${path}.number_integer` — When the number is not an integer
 * - `${path}.number_positive` — When the number is not positive
 */
export const PositiveNumberSchema = z.coerce
  .number({ error: () => `${path}.number_invalid` })
  .int({ error: () => `${path}.number_integer` })
  .positive({ error: () => `${path}.number_positive` })
