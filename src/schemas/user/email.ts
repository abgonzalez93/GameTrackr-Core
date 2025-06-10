import { z } from 'zod'

const blockedDomains = ['mailinator.com', '10minutemail.com', 'tempmail.com']

/**
 * Zod schema for validating a normalized, secure email address.
 */
export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email()
  .refine(
    (value) => {
      const domain = value.split('@')[1]
      return !blockedDomains.includes(domain)
    },
    {
      message: 'Disposable email addresses are not allowed',
    },
  )

export type Email = z.infer<typeof EmailSchema>
