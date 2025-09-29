import { getTranslationPath } from '@utils/index'
import { UserEmailSchema } from './UserEmail'
import { UserNameSchema } from './UserName'
import { z } from 'zod'

const passwordRequirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
const path = getTranslationPath(import.meta.url)

/**
 * Zod schema for creating a new user.
 */
export const CreateUserBaseSchema = z
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

export const CreateUserSchema = CreateUserBaseSchema.transform(({ email, name, password, username, avatarUrl, bio }) => ({
  email,
  name,
  password,
  username,
  avatarUrl,
  bio,
}))

export type CreateUser = z.infer<typeof CreateUserSchema>
