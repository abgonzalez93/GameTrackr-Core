import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { UserEmailSchema } from './UserEmailSchema.js'
import { UserNameSchema } from './UserNameSchema.js'
import { z } from 'zod'

const passwordRequirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
const path = getTranslationPath(import.meta.url)

/**
 * **CreateUserSchema**
 *
 * Zod schema defining the **input payload** required to register a new user.
 *
 * ### Purpose
 * Ensures all necessary user data (email, password, username, etc.)
 * meet validation and security requirements before account creation.
 *
 * ### Structure
 * - `email`: User’s email address — validated by {@link UserEmailSchema}.
 * - `name`: Optional display name (nullable).
 * - `password`: User’s password — must meet complexity rules:
 *   - At least 8 characters
 *   - Includes uppercase and lowercase letters
 *   - Includes at least one digit
 *   - Includes at least one special character
 * - `username`: Unique public username, validated by {@link UserNameSchema}.
 * - `avatarUrl`: Optional profile picture URL (nullable).
 * - `bio`: Optional short biography (max 280 characters, nullable).
 * - `passwordConfirm`: Confirmation of the password; must match `password`.
 *
 * ### Validation Rules
 * - Password and confirmation must match.
 * - Invalid or weak passwords trigger `${path}.password_invalid`.
 * - Missing confirmation triggers `${path}.password_confirm_required`.
 * - Mismatched confirmation triggers `${path}.password_mismatch`.
 *
 * @see {@link UserEmailSchema}
 * @see {@link UserNameSchema}
 */
export const CreateUserSchema = z
  .object({
    email: UserEmailSchema,
    name: z.string().nullable().optional(),
    password: z.string().min(8).regex(passwordRequirementsRegex, `${path}.password_invalid`),
    username: UserNameSchema,
    avatarUrl: z.url().nullable().optional(),
    bio: z.string().max(280).nullable().optional(),
    passwordConfirm: z.string().min(8, `${path}.password_confirm_required`),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: () => `${path}.password_mismatch`,
    path: ['passwordConfirm'],
  })
