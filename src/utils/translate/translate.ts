import { en } from '@i18n/index'
import { i18n } from 'i18next'

export type TranslationVariables = Record<string, string | number>

export interface TranslationParams {
  key: string
  variables?: TranslationVariables
}

/**
 * Checks if a given string exists as a translation key within a nested JSON object.
 * Supports nested keys separated by dots (e.g., "core.schemas.login").
 *
 * @param key - The translation key to check.
 * @param obj - The JSON object containing translation keys. Defaults to the English translations (`en`).
 * @returns `true` if the key exists and points to a string value, otherwise `false`.
 */
const isTranslationKey = (key: string, obj: Record<string, unknown> = en): boolean => {
  if (!key?.trim()) return false

  const parts = key.split('.')
  let current: unknown = obj

  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) return false
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === 'string'
}

/**
 * Serializes a translation key and optional variables into a JSON string.
 * Useful for structured error messages or logs that need to carry translation information.
 *
 * @param key - The translation key to serialize.
 * @param variables - Optional object with interpolation variables for the translation.
 * @returns A JSON string representing the translation payload, e.g. `{"key":"some.key","variables":{"name":"John"}}`.
 */
const serializeTranslation = (key: string, variables?: TranslationVariables): string =>
  JSON.stringify({ key, variables: variables || undefined })

/**
 * Determines the final error message for TrackPlay errors.
 *
 * Behavior:
 * - If `message` is a string and matches a translation key → serializes it using `serializeTranslation`.
 * - If `message` is a string but not a translation key → returns it as-is (plain text).
 * - If `message` is an object of type `TranslationParams` → serializes key + variables.
 *
 * @param message - The message to format, either a plain string or `TranslationParams`.
 * @returns A string ready to be used in error handling or logs. If the message is a translation, it is JSON-serialized.
 */
export const formatErrorMessage = (message: string | TranslationParams): string => {
  if (typeof message === 'string') {
    return isTranslationKey(message) ? serializeTranslation(message) : message
  } else {
    return serializeTranslation(message.key, message.variables)
  }
}

/**
 * Parses a translation message string into an object.
 * If the input is not valid JSON or lacks `key`, it returns null.
 *
 * @param serialized - JSON string created via serializeTranslation.
 * @returns Parsed object with `key` and optional `variables`, or null on failure.
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
 * Translates a message using the provided i18n instance.
 *
 * @param i18n - The i18n instance used to perform the translation.
 * @param message - The message to translate. Can be:
 *   - A plain string (either a direct message or a serialized translation payload).
 *   - A `TranslationParams` object containing a translation key and optional variables.
 * @returns The translated string, or the original message if it cannot be translated.
 */
export const translate = (i18n: i18n, message: string | TranslationParams): string => {
  if (typeof message === 'string') {
    const parsed = parseTranslation(message)
    return parsed ? i18n.t(parsed.key, parsed.variables) : message
  }

  return i18n.t(message.key, message.variables)
}
