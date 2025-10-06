import { UserEmailSchema } from './UserEmail.js'
import { IdSchema } from '../shared/id.js'
import { z } from 'zod'

/**
 * Schema representing the public-facing data of a user.
 *
 * This is safe to expose to the frontend or third-party consumers.
 */
export const PublicUserSchema = z.object({
  id: IdSchema,
  email: UserEmailSchema,
  username: z.string().min(3),
  name: z.string().nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
  bio: z.string().max(280).nullable().optional(),
})

export type PublicUser = z.infer<typeof PublicUserSchema>
