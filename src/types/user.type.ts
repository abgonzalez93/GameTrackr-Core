import { z } from 'zod'
import { AdminUserSchema, CreateUserSchema, PublicUserSchema, UserEmailSchema, UserNameSchema } from '#schemas/user.schema'

export type AdminUser = z.infer<typeof AdminUserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type PublicUser = z.infer<typeof PublicUserSchema>
export type UserEmail = z.infer<typeof UserEmailSchema>
export type UserName = z.infer<typeof UserNameSchema>
