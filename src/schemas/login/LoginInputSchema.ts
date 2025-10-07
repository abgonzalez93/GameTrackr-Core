import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { UserEmailSchema } from '../user/UserEmailSchema.js'
import { UserNameSchema } from '../user/UserNameSchema.js'
import { z } from 'zod'

const path = getTranslationPath(import.meta.url)

/**
 * **LoginInputSchema**
 *
 * Zod schema for validating **user login requests**.
 *
 * ### Purpose
 * Allows authentication using either:
 * - A **valid email address** (validated by {@link UserEmailSchema}), or
 * - A **valid username** (validated by {@link UserNameSchema})
 *
 * ### Behavior
 * - `identifier`: Must be a valid email or username (minimum 3 characters).
 * - `password`: Must be a non-empty string (at least 1 character).
 * - Automatically provides localized error keys using the translation path.
 *
 * @see {@link UserEmailSchema}
 * @see {@link UserNameSchema}
 */
export const LoginInputSchema = z
  .object({
    identifier: z.string().min(3, `${path}.identifier_required`),
    password: z.string().min(1, `${path}.password_required`),
  })
  .refine(
    ({ identifier }) => UserEmailSchema.safeParse(identifier).success || UserNameSchema.safeParse(identifier).success,
    {
      path: ['identifier'],
      error: () => `${path}.identifier_invalid`,
    },
  )
