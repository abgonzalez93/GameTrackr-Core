import { nullToUndefined } from '@schemas/shared'
import { UserEmailSchema } from './UserEmail'
import { UserNameSchema } from './UserName'
import { z } from 'zod'

const passwordRequirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
const path = 'core.schemas.CreateUser'

/**
 * Zod schema for creating a new user.
 */
export const CreateUserBaseSchema = z
  .object({
    email: UserEmailSchema,
    name: nullToUndefined(z.string()),
    password: z.string().min(8).regex(passwordRequirementsRegex, `${path}.password_invalid`),
    username: UserNameSchema,
    avatarUrl: nullToUndefined(z.url()),
    bio: nullToUndefined(z.string().max(280)),
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
