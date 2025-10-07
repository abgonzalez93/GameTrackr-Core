import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { i18n } from 'i18next'

/**
 * Attempts to parse a serialized translation payload into a {@link TranslationOptions} object.
 *
 * ### Behavior
 * - Returns `null` if the string is not valid JSON or lacks a `key` property.
 * - Safely handles malformed input.
 *
 * @param serialized - JSON string previously created via {@link serializeTranslation}.
 * @returns Parsed {@link TranslationOptions} object, or `null` on failure.
 */
const parseTranslation = (serialized: string): TranslationOptions | null => {
  if (typeof serialized !== 'string') return null

  try {
    const parsed = JSON.parse(serialized)
    if (!parsed || typeof parsed.key !== 'string') return null
    if (parsed.variables && (typeof parsed.variables !== 'object' || Array.isArray(parsed.variables))) return null
    return parsed
  } catch {
    return null
  }
}

/**
 * Resolves and translates a message using the provided {@link i18n} instance.
 *
 * ### Responsibilities
 * - Detects whether the input is a plain string, serialized payload, or translation object.
 * - Uses `i18n.t()` internally for variable interpolation.
 * - Falls back to the raw message when translation is unavailable.
 *
 * @param i18n - Active i18n instance.
 * @param message - Message to translate (string, serialized payload, or {@link TranslationOptions}).
 * @returns The translated string, or original message on failure.
 */
export const translate = (i18n: i18n, message: string | TranslationOptions): string => {
  if (typeof message === 'string') {
    const parsed = parseTranslation(message)
    return parsed ? i18n.t(parsed.key, parsed.variables) : message
  }

  return i18n.t(message.key, message.variables)
}
