import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

const blockedDomains = ['mailinator.com', '10minutemail.com', 'tempmail.com']

const getDomain = (email: string): string => email.split('@')[1] ?? ''

export const UserEmailSchema = z
  .email({ error: () => `${path}.email_required` })
  .trim()
  .toLowerCase()
  .refine((email) => !blockedDomains.includes(getDomain(email)), {
    error: () => `${path}.email_disposable`,
  })
  .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
    error: () => `${path}.email_invalid`,
  })
