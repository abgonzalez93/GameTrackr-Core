import { z } from 'zod'

/**
 * List of blocked disposable or temporary email domains.
 */
const blockedDomains = ['mailinator.com', '10minutemail.com', 'tempmail.com']

/**
 * Extracts the domain part of an email, safely.
 *
 * @param email - The email string
 * @returns The domain part after `@`, or empty string if malformed
 */
const getDomain = (email: string): string => email.split('@')[1] ?? ''

/**
 * Zod schema for validating a normalized, secure email address.
 *
 * - Trims and lowercases the input
 * - Requires a valid email format
 * - Rejects emails from known disposable domains
 */
export const UserEmailSchema = z
  .string({ required_error: 'Email is required' })
  .trim()
  .toLowerCase()
  .email('Invalid email address format')
  .refine((email) => !blockedDomains.includes(getDomain(email)), { message: 'Disposable email addresses are not allowed' })

export type UserEmail = z.infer<typeof UserEmailSchema>
