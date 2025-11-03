import { z } from 'zod'
import { ForgotPasswordSchema } from '#schemas/login/ForgotPasswordSchema'

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>
