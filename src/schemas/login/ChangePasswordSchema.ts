import { z } from 'zod'
import { IdSchema } from '../base/IdSchema.ts'

export const ChangePasswordSchema = z.object({
  userId: IdSchema,
  newPassword: z.string().min(8),
})
