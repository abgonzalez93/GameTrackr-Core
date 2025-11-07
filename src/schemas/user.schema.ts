import { z } from 'zod'
import { IdSchema } from './base.schema.ts'
import { getTranslationPath } from '#utils/translate.util'

const path = getTranslationPath(import.meta.url)

const blockedDomains = ['mailinator.com', '10minutemail.com', 'tempmail.com']

export const UserEmailSchema = z
  .email({ error: () => `${path}.email_required` })
  .trim()
  .toLowerCase()
  .refine((email) => !blockedDomains.includes(email.split('@')[1] ?? ''), {
    error: () => `${path}.email_disposable`,
  })
  .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
    error: () => `${path}.email_invalid`,
  })

export const UserNameSchema = z
  .string({ error: () => `${path}.username_required` })
  .trim()
  .min(3, `${path}.username_min`)
  .max(30, `${path}.username_max`)
  .regex(/^[a-zA-Z0-9_]+$/, `${path}.username_invalid`)

export const PublicUserSchema = z.object({
  id: IdSchema,
  email: UserEmailSchema,
  username: z.string().min(3),
  name: z.string().nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
  bio: z.string().max(280).nullable().optional(),
})

export const AdminUserSchema = PublicUserSchema.extend({
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLoginAt: z.string().nullable().optional(),
})

export const CreateUserSchema = z
  .object({
    email: UserEmailSchema,
    name: z.string().nullable().optional(),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, `${path}.password_invalid`),
    username: UserNameSchema,
    avatarUrl: z.url().nullable().optional(),
    bio: z.string().max(280).nullable().optional(),
    passwordConfirm: z.string().min(8, `${path}.password_confirm_required`),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: () => `${path}.password_mismatch`,
    path: ['passwordConfirm'],
  })
