import { z } from 'zod'
import { UserEmailSchema } from '../user/UserEmailSchema.ts'
import { UserNameSchema } from '../user/UserNameSchema.ts'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const LoginInputSchema = z
  .object({
    identifier: z.string().min(3, `${path}.identifier_required`),
    password: z.string().min(1, `${path}.password_required`),
  })
  .refine(
    ({ identifier }) => UserEmailSchema.safeParse(identifier).success || UserNameSchema.safeParse(identifier).success,
    {
      path: ['identifier'],
      error: () => `${path}.identifier_invalid`,
    },
  )
