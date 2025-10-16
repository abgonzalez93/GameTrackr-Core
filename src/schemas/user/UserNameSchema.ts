import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

/**
 * **UserNameSchema**
 *
 * Zod schema defining validation rules for a **user’s public username** —
 * used as a login identifier and visible handle across the platform.
 *
 * ### Purpose
 * Ensures that usernames follow consistent, human-readable, and safe
 * formatting rules suitable for URLs, mentions, and search queries.
 *
 * ### Validation Rules
 * - Must be a non-empty string.
 * - Minimum length: **3 characters** → `${path}.username_min`.
 * - Maximum length: **30 characters** → `${path}.username_max`.
 * - Only allows **alphanumeric characters** and underscores (`_`).
 * - Disallows spaces and special characters (e.g., `@`, `#`, `$`, etc.).
 * - Trimmed automatically to remove leading/trailing whitespace.
 *
 * ### Errors
 * - `${path}.username_required` → Missing or empty username.
 * - `${path}.username_min` → Too short.
 * - `${path}.username_max` → Too long.
 * - `${path}.username_invalid` → Contains forbidden characters.
 *
 * ### Notes
 * - Used both for authentication and display (public profile handle).
 * - Validation is translation-aware via the `path` identifier.
 *
 * @see {@link getTranslationPath}
 */
export const UserNameSchema = z
  .string({ error: () => `${path}.username_required` })
  .trim()
  .min(3, `${path}.username_min`)
  .max(30, `${path}.username_max`)
  .regex(/^[a-zA-Z0-9_]+$/, `${path}.username_invalid`)
