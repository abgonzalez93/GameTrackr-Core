import { z } from 'zod'
import { UserEmailSchema } from '../user/UserEmailSchema.ts'

export const ForgotPasswordSchema = z.object({
  email: UserEmailSchema,
})
