import { getTranslationPath } from './getTranslationPath'
import { BadRequestError } from '@errors/index'
import { en } from '@i18n/index'
import { i18n } from 'i18next'

export type TranslationVariables = Record<string, string | number>

/**
 * Represents a structured translation message definition.
 *
 * This object is used to describe a translatable key and its interpolation
 * variables in a consistent, serializable format.
 *
 * @property key - The translation key (e.g. `"core.errors.invalid_token"`).
 * @property variables - Optional mapping of placeholders to their runtime values.
 */
export interface TranslationParams {
  key: string
  variables?: TranslationVariables
}

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
 * - If the input is a {@link TranslationParams} object, serializes its key and variables.
 *
 * @param message - Either a plain string or {@link TranslationParams} object.
 * @returns A standardized string suitable for logs or API responses.
 */
export const formatErrorMessage = (message: string | TranslationParams): string => {
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

/**
 * Attempts to parse a serialized translation payload into a {@link TranslationParams} object.
 *
 * ### Behavior
 * - Returns `null` if the string is not valid JSON or lacks a `key` property.
 * - Safely handles malformed input.
 *
 * @param serialized - JSON string previously created via {@link serializeTranslation}.
 * @returns Parsed {@link TranslationParams} object, or `null` on failure.
 */
const parseTranslation = (serialized: string): TranslationParams | null => {
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
 * @param message - Message to translate (string, serialized payload, or {@link TranslationParams}).
 * @returns The translated string, or original message on failure.
 */
export const translate = (i18n: i18n, message: string | TranslationParams): string => {
  if (typeof message === 'string') {
    const parsed = parseTranslation(message)
    return parsed ? i18n.t(parsed.key, parsed.variables) : message
  }

  return i18n.t(message.key, message.variables)
}
