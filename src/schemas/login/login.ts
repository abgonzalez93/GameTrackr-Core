import { SignedTokenPairSchema, PublicUserSchema, UserEmailSchema, UserIdSchema } from '@schemas/index'
import z from 'zod'

/**
 * Zod schema for validating user login input.
 *
 * Requires a valid email address and a non-empty password.
 */
export const LoginInputSchema = z.object({
  email: UserEmailSchema,
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
})

export type LoginInput = z.infer<typeof LoginInputSchema>

/**
 * Zod schema for the response returned by the login service.
 *
 * Includes a signed token pair and public user information.
 */
export const LoginResponseSchema = z.object({
  tokens: SignedTokenPairSchema,
  user: PublicUserSchema,
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
