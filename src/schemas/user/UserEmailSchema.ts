import { getI18n } from '@i18n/index'
import { z } from 'zod'

const i18n = getI18n()

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
  .string({ required_error: i18n.t('core.schemas.login.email_required') })
  .trim()
  .toLowerCase()
  .email(i18n.t('core.schemas.login.email_invalid'))
  .refine((email) => !blockedDomains.includes(getDomain(email)), { message: i18n.t('core.schemas.login.email_disposable') })

export type UserEmail = z.infer<typeof UserEmailSchema>
