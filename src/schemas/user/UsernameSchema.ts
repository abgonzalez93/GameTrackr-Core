import z from 'zod'

/**
 * Zod schema for validating a username (used as login identifier).
 *
 * - Between 3 and 30 characters
 * - Alphanumeric characters and underscores only
 * - No spaces or special characters
 */
export const UsernameSchema = z
  .string({ required_error: 'Username is required' })
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores are allowed')

export type Username = z.infer<typeof UsernameSchema>
