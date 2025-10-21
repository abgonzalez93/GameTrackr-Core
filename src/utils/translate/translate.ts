import { type i18n } from 'i18next'
import { type Logger } from 'winston'
import { type Translatable } from '#types/translate/Translatable'
import { getTranslationPath } from './getTranslationPath.ts'

const path = getTranslationPath(import.meta.url)

/**
 * **translate**
 *
 * Resolves a localized string from either a plain key or a {@link Translatable} object.
 *
 * ### Responsibilities
 * - Lookup translations within the provided {@link i18n} instance.
 * - Interpolate variables when provided.
 * - Log missing keys with the current language.
 * - Return a safe fallback when no translation is found.
 *
 * ### Behavior
 * - If `input` is a string, it is treated as a translation key.
 * - If `input` is a {@link Translatable}, its `variables` are interpolated.
 * - If the key is missing, a warning is logged and `fallbackKey` (if valid) is used.
 *
 * @param i18n - Initialized i18next instance.
 * @param logger - Winston logger for missing translation warnings.
 * @param input - Translation key or {@link Translatable} object.
 * @param fallbackKey - Optional fallback translation key.
 * @returns Localized string, or the fallback key / raw input if missing.
 *
 * @see {@link Translatable}
 */
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
