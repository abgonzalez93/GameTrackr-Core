import { z } from 'zod'
import { IdSchema } from '../base/IdSchema.ts'
import { UserEmailSchema } from './UserEmailSchema.ts'

export const PublicUserSchema = z.object({
  id: IdSchema,
  email: UserEmailSchema,
  username: z.string().min(3),
  name: z.string().nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
  bio: z.string().max(280).nullable().optional(),
})
