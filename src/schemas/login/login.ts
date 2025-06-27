import { UserEmailSchema, UsernameSchema, UserIdSchema } from '@schemas/user'
import { SignedTokenPairSchema } from '@schemas/jwt'
import { getI18n } from '@i18n/index'
import z from 'zod'

const i18n = getI18n()

/**
 * Zod schema for validating user login input.
 *
 * Requires a valid email address and a non-empty password.
 */
export const LoginInputSchema = z
  .object({
    identifier: z.string().min(3, i18n.t('core.schemas.login.identifier_required')),
    password: z.string().min(1, i18n.t('core.schemas.login.password_required')),
  })
  .refine(
    ({ identifier }) => UserEmailSchema.safeParse(identifier).success || UsernameSchema.safeParse(identifier).success,
    {
      path: ['identifier'],
      message: i18n.t('core.schemas.login.identifier_invalid'),
    },
  )

export type LoginInput = z.infer<typeof LoginInputSchema>

/**
 * Zod schema for the response returned by the login service.
 *
 * Only includes the signed token pair.
 */
export const LoginResponseSchema = z.object({
  tokens: SignedTokenPairSchema,
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

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>

/**
 * Zod schema for validating a password change request.
 *
 * Requires a valid user ID and a new password.
 */
export const ChangePasswordSchema = z.object({
  userId: UserIdSchema,
  newPassword: z.string().min(8),
})

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>

/**
 * Zod schema for validating a username change request.
 *
 * Requires a valid user ID and a new username.
 */
export const ChangeUsernameSchema = z.object({
  userId: UserIdSchema,
  newUsername: z.string().min(3),
})

export type ChangeUsernameInput = z.infer<typeof ChangeUsernameSchema>
