import { PublicUserSchema } from './PublicUser.js'
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
 * @see PublicUser for the public-facing subset of this schema
 */
export const AdminUserSchema = PublicUserSchema.extend({
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLoginAt: z.string().nullable().optional(),
})

export type AdminUser = z.infer<typeof AdminUserSchema>
