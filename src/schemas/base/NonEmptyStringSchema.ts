import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const NonEmptyStringSchema = z
  .string({ error: () => `${path}.string_invalid` })
  .min(1, { error: () => `${path}.string_empty` })
