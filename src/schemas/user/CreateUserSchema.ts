import { UserEmailSchema } from './UserEmailSchema'
import { UsernameSchema } from './UsernameSchema'
import { nullToUndefined } from '@schemas/shared'
import { getI18n } from '@i18n/index'
import { z } from 'zod'

const i18n = getI18n()
const passwordRequirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

/**
 * Zod schema for creating a new user.
 */
export const CreateUserBaseSchema = z
  .object({
    email: UserEmailSchema,
    name: nullToUndefined(z.string()),
    password: z.string().min(8).regex(passwordRequirementsRegex, i18n.t('core.schemas.login.password_invalid')),
    username: UsernameSchema,
    avatarUrl: nullToUndefined(z.string().url()),
    bio: nullToUndefined(z.string().max(280)),
    passwordConfirm: z.string().min(8, i18n.t('core.schemas.login.password_confirm_required')),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: i18n.t('core.schemas.login.password_mismatch'),
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
