import { z } from 'zod'
import { PublicUserSchema } from './PublicUserSchema.ts'

export const AdminUserSchema = PublicUserSchema.extend({
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLoginAt: z.string().nullable().optional(),
})
