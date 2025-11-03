import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const UserNameSchema = z
  .string({ error: () => `${path}.username_required` })
  .trim()
  .min(3, `${path}.username_min`)
  .max(30, `${path}.username_max`)
  .regex(/^[a-zA-Z0-9_]+$/, `${path}.username_invalid`)
