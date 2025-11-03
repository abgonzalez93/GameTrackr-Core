import { z } from 'zod'
import { CreateUserSchema } from '#schemas/user/CreateUserSchema'

export type CreateUser = z.infer<typeof CreateUserSchema>
