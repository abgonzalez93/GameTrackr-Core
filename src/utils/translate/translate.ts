import { type i18n } from 'i18next'
import { type Logger } from 'winston'
import { getTranslationPath } from './getTranslationPath.ts'
import { type Translatable } from '#types/translate/Translatable'

const path = getTranslationPath(import.meta.url)

export const translate = (i18n: i18n, logger: Logger, input: string | Translatable, fallbackKey?: string): string => {
  const language = i18n.language ?? i18n.resolvedLanguage ?? 'unknown'

  const resolveFallback = (defaultValue: string): string => {
    if (fallbackKey && i18n.exists(fallbackKey)) return i18n.t(fallbackKey)
    return defaultValue
  }

  const key = typeof input === 'string' ? input : input.key
  const vars = typeof input === 'string' ? undefined : input.variables

  if (i18n.exists(key)) return i18n.t(key, vars)

  logger.warn(`⚠️ ${i18n.t(`${path}.missing_key`, { key, language })}`)
  return resolveFallback(key)
}
