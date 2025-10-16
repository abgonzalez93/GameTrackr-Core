import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

/**
 * List of disallowed disposable or temporary email domains.
 *
 * Used to prevent registration with throwaway addresses that
 * undermine account persistence or verification workflows.
 */
const blockedDomains = ['mailinator.com', '10minutemail.com', 'tempmail.com']

/**
 * Safely extracts the domain portion of an email address.
 *
 * @param email - The email string.
 * @returns The domain substring after `"@"`, or an empty string if malformed.
 */
const getDomain = (email: string): string => email.split('@')[1] ?? ''

/**
 * **UserEmailSchema**
 *
 * Zod schema defining validation rules for a **normalized and secure email address**.
 *
 * ### Purpose
 * Ensures that any user-provided email is properly formatted, normalized,
 * and not associated with known disposable or temporary providers.
 *
 * ### Validation Rules
 * - Must match a valid email format.
 * - Automatically trimmed and lowercased.
 * - Must not belong to blocked disposable domains (`mailinator.com`, `tempmail.com`, etc.).
 * - Must follow a safe pattern: `^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$`.
 *
 * ### Errors
 * - `${path}.email_required` → Missing or invalid email format.
 * - `${path}.email_disposable` → Belongs to a disposable domain.
 * - `${path}.email_invalid` → Invalid syntax or unsafe pattern.
 *
 * ### Notes
 * - Applied during user registration and authentication workflows.
 * - Integrates with translation-aware error messages.
 *
 * @see {@link getTranslationPath}
 */
export const UserEmailSchema = z
  .email({ error: () => `${path}.email_required` })
  .trim()
  .toLowerCase()
  .refine((email) => !blockedDomains.includes(getDomain(email)), {
    error: () => `${path}.email_disposable`,
  })
  .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
    error: () => `${path}.email_invalid`,
  })
