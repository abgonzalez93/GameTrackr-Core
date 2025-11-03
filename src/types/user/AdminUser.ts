import { z } from 'zod'
import { AdminUserSchema } from '#schemas/user/AdminUserSchema'

export type AdminUser = z.infer<typeof AdminUserSchema>
