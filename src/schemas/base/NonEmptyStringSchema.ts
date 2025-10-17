import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

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
export const NonEmptyStringSchema = z
  .string({ error: () => `${path}.string_invalid` })
  .min(1, { error: () => `${path}.string_empty` })
