import { z } from 'zod'
import { UserEmailSchema } from './UserEmailSchema.ts'
import { UserNameSchema } from './UserNameSchema.ts'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const passwordRequirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
const path = getTranslationPath(import.meta.url)

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
