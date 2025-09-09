import { z } from 'zod'

const path = 'core.schemas.UserName'

/**
 * Zod schema for validating a username (used as login identifier).
 *
 * - Between 3 and 30 characters
 * - Alphanumeric characters and underscores only
 * - No spaces or special characters
 */
export const UserNameSchema = z
  .string({ error: () => `${path}.username_required` })
  .trim()
  .min(3, `${path}.username_min`)
  .max(30, `${path}.username_max`)
  .regex(/^[a-zA-Z0-9_]+$/, `${path}.username_invalid`)

export type UserName = z.infer<typeof UserNameSchema>
