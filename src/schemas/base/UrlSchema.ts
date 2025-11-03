import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const UrlSchema = z.url({ error: () => `${path}.url_invalid` })
