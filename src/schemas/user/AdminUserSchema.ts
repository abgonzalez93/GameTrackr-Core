import { PublicUserSchema } from './PublicUserSchema'
import { nullToUndefined } from '@schemas/index'
import { z } from 'zod'

/**
 * Zod schema representing an internal or admin view of a user.
 *
 * Extends the public user schema with additional internal fields such as
 * account status, admin privileges, and timestamps.
 *
 * This schema is intended for use in backend services, dashboards,
 * or administrative tools where full user data is required.
 *
 * @see PublicUserSchema for the public-facing subset of this schema
 */
export const AdminUserSchema = PublicUserSchema.extend({
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLoginAt: nullToUndefined(z.string()),
})

export type AdminUser = z.infer<typeof AdminUserSchema>
