import { z } from 'zod'
import { UserNameSchema } from '#schemas/user/UserNameSchema'

export type UserName = z.infer<typeof UserNameSchema>
