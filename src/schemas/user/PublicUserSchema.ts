import { UserEmailSchema } from './UserEmailSchema'
import { nullToUndefined } from '@schemas/shared'
import { UserIdSchema } from './UserIdSchema'
import { z } from 'zod'

/**
 * Schema representing the public-facing data of a user.
 *
 * This is safe to expose to the frontend or third-party consumers.
 */
export const PublicUserSchema = z.object({
  id: UserIdSchema,
  email: UserEmailSchema,
  username: z.string().min(3),
  name: nullToUndefined(z.string()),
  avatarUrl: nullToUndefined(z.string().url()),
  bio: nullToUndefined(z.string().max(280)),
})

export type PublicUser = z.infer<typeof PublicUserSchema>
