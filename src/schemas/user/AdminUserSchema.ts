import { PublicUserSchema } from './PublicUserSchema.js'
import { z } from 'zod'

/**
 * **AdminUserSchema**
 *
 * Zod schema defining the **internal or administrative representation** of a user entity.
 *
 * ### Purpose
 * Extends the public-facing {@link PublicUserSchema} with additional internal fields
 * required for backend management, analytics, or administrative dashboards.
 *
 * ### Structure
 * - `isAdmin`: Whether the user has administrative privileges.
 * - `isActive`: Whether the user’s account is currently active or suspended.
 * - `createdAt`: ISO 8601 timestamp of user creation.
 * - `updatedAt`: ISO 8601 timestamp of the last profile update.
 * - `lastLoginAt`: ISO 8601 timestamp of the last login event (nullable).
 *
 * ### Notes
 * - Intended exclusively for **internal service use** (e.g., backoffice tools).
 * - Should never be exposed directly through public APIs.
 *
 * @see {@link PublicUserSchema}
 */
export const AdminUserSchema = PublicUserSchema.extend({
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLoginAt: z.string().nullable().optional(),
})
