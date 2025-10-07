import { type TranslationVariables } from '#types/translate/TranslationVariables'
import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { getTranslationPath } from './getTranslationPath.js'
import { BadRequestError } from '#errors/BadRequestError'
import { en } from '#i18n/locales/index'

const path = getTranslationPath(import.meta.url)

/**
 * Validates whether a given key exists within a translation dictionary.
 *
 * ### Responsibilities
 * - Supports nested keys separated by dots (e.g., `"core.schemas.login"`).
 * - Ensures that the final resolved value is a string (not an object).
 * - Throws a {@link BadRequestError} if validation fails.
 *
 * @param key - Translation key to validate.
 * @param obj - Translation dictionary to check against (defaults to English).
 * @throws {BadRequestError} If the key is missing or does not resolve to a string.
 */
const isTranslationKey = (key: string, obj: Record<string, unknown> = en): void => {
  if (!key.includes('.')) return

  const parts = key.split('.')
  let current: unknown = obj

  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) throw new BadRequestError(`${path}.invalid_key`)
    current = (current as Record<string, unknown>)[part]
  }

  if (typeof current !== 'string') throw new BadRequestError(`${path}.invalid_key_type`)
}

/**
 * Serializes a translation key and optional variables into a JSON string.
 *
 * @param key - The translation key to serialize.
 * @param variables - Optional variable placeholders for interpolation.
 * @returns A JSON string representing the translation payload.
 */
const serializeTranslation = (key: string, variables?: TranslationVariables): string =>
  JSON.stringify({ key, variables: variables || undefined })

/**
 * Formats any message into a consistent, serializable string format.
 *
 * ### Behavior
 * - If the input is a **valid translation key**, returns a JSON-serialized payload.
 * - If the input is a **plain string** with no matching translation, returns it as-is.
 * - If the input is a {@link TranslationOptions} object, serializes its key and variables.
 *
 * @param message - Either a plain string or {@link TranslationOptions} object.
 * @returns A standardized string suitable for logs or API responses.
 */
export const formatErrorMessage = (message: string | TranslationOptions): string => {
  if (typeof message === 'string') {
    try {
      isTranslationKey(message)
      return serializeTranslation(message)
    } catch {
      return message
    }
  } else {
    isTranslationKey(message.key)
    return serializeTranslation(message.key, message.variables)
  }
}
