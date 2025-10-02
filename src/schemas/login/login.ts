import { UserEmailSchema, UserNameSchema } from '@schemas/user'
import { getTranslationPath } from '@utils/index'
import { TokenPairSchema } from '@schemas/jwt'
import { IdSchema } from '@schemas/shared'
import z from 'zod'

const path = getTranslationPath(import.meta.url)

/**
 * Zod schema for validating user login input.
 *
 * Requires a valid email address and a non-empty password.
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

export type LoginInput = z.infer<typeof LoginInputSchema>

/**
 * Zod schema for the response returned by the login service.
 *
 * Only includes the signed token pair.
 */
export const LoginResponseSchema = z.object({
  tokens: TokenPairSchema,
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>

/**
 * Zod schema for validating forgot password input.
 *
 * Accepts only a validated user email.
 */
export const ForgotPasswordSchema = z.object({
  email: UserEmailSchema,
})

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>

/**
 * Zod schema for validating a password change request.
 *
 * Requires a valid user ID and a new password.
 */
export const ChangePasswordSchema = z.object({
  userId: IdSchema,
  newPassword: z.string().min(8),
})

export type ChangePassword = z.infer<typeof ChangePasswordSchema>

/**
 * Zod schema for validating a username change request.
 *
 * Requires a valid user ID and a new username.
 */
export const ChangeUsernameSchema = z.object({
  userId: IdSchema,
  newUsername: z.string().min(3),
})

export type ChangeUsername = z.infer<typeof ChangeUsernameSchema>
