import { z } from 'zod'
import { UserEmailSchema } from '#schemas/user/UserEmailSchema'

export type UserEmail = z.infer<typeof UserEmailSchema>
