import { z } from 'zod'
import { IdSchema } from '../base/IdSchema.ts'

export const ChangeUsernameSchema = z.object({
  userId: IdSchema,
  newUsername: z.string().min(3),
})
