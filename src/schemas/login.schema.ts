import { z } from 'zod'
import { IdSchema } from './base.schema.ts'
import { TokenPairSchema } from './token.schema.ts'
import { UserEmailSchema, UserNameSchema } from './user.schema.ts'
import { getTranslationPath } from '#utils/translate.util'

const path = getTranslationPath(import.meta.url)

export const ChangePasswordSchema = z.object({
  userId: IdSchema,
  newPassword: z.string().min(8),
})

export const ChangeUsernameSchema = z.object({
  userId: IdSchema,
  newUsername: z.string().min(3),
})

export const ForgotPasswordSchema = z.object({
  email: UserEmailSchema,
})

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

export const LoginResponseSchema = z.object({
  tokens: TokenPairSchema,
})
