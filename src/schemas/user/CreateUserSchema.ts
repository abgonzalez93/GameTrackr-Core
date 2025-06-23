import { UserEmailSchema } from './UserEmailSchema'
import { z } from 'zod'

const passwordRequirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

/**
 * Zod schema for creating a new user.
 */
export const CreateUserBaseSchema = z
  .object({
    email: UserEmailSchema,
    name: z.string().min(1).optional(),
    password: z
      .string()
      .min(8)
      .regex(passwordRequirementsRegex, 'Password must include uppercase, lowercase, number and special character'),
    username: z.string().min(3),
    avatarUrl: z.string().url().optional(),
    bio: z.string().max(280).optional(),
    passwordConfirm: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  })

export const CreateUserSchema = CreateUserBaseSchema.transform(({ email, name, password, username, avatarUrl, bio }) => ({
  email,
  name,
  password,
  username,
  avatarUrl,
  bio,
}))

export type CreateUser = z.infer<typeof CreateUserSchema>
