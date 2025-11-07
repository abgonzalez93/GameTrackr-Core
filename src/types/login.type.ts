import { z } from 'zod'
import {
  ChangePasswordSchema,
  ChangeUsernameSchema,
  ForgotPasswordSchema,
  LoginInputSchema,
  LoginResponseSchema,
} from '#schemas/login.schema'

export type ChangePassword = z.infer<typeof ChangePasswordSchema>
export type ChangeUsername = z.infer<typeof ChangeUsernameSchema>
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>
export type LoginInput = z.infer<typeof LoginInputSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>
