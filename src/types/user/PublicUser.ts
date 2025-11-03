import { z } from 'zod'
import { PublicUserSchema } from '#schemas/user/PublicUserSchema'

export type PublicUser = z.infer<typeof PublicUserSchema>
