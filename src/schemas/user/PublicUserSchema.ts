import { z } from 'zod'
import { IdSchema } from '../base/IdSchema.ts'
import { UserEmailSchema } from './UserEmailSchema.ts'

/**
 * **PublicUserSchema**
 *
 * Zod schema defining the **public-facing representation** of a user.
 *
 * ### Purpose
 * Represents the subset of user data that is **safe to expose** externally
 * — for example, to frontend clients, APIs, or third-party integrations.
 *
 * This schema omits sensitive fields such as passwords, tokens, or admin flags,
 * providing a clean and secure public profile representation.
 *
 * ### Structure
 * - `id`: Unique identifier of the user, validated by {@link IdSchema}.
 * - `email`: Publicly visible or shareable email (depending on privacy settings).
 * - `username`: Public handle used for profile identification (min 3 chars).
 * - `name`: Optional display name (nullable).
 * - `avatarUrl`: Optional profile picture URL (nullable).
 * - `bio`: Optional short biography or description (nullable, max 280 characters).
 *
 * ### Notes
 * - Intended for **frontend consumption** and **public APIs**.
 * - Does **not** include sensitive or internal-only fields (e.g., `isAdmin`, `createdAt`).
 * - Extended internally by {@link AdminUserSchema}.
 *
 * @see {@link IdSchema}
 * @see {@link UserEmailSchema}
 * @see {@link AdminUserSchema}
 */
export const PublicUserSchema = z.object({
  id: IdSchema,
  email: UserEmailSchema,
  username: z.string().min(3),
  name: z.string().nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
  bio: z.string().max(280).nullable().optional(),
})
