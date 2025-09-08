import { BadRequestError } from '@errors/index'
import { CorePath, en } from '@i18n/index'
import { i18n } from 'i18next'

export type TranslationVariables = Record<string, string | number>

export interface TranslationParams {
  key: string
  variables?: TranslationVariables
}

const path: CorePath = 'core.utils.translate'

/**
 * Validates whether a given string is a valid translation key within the provided translations object.
 *
 * - Supports nested keys separated by dots (e.g., `"core.schemas.login"`).
 * - Throws an error if the key does not exist or does not map to a string value.
 *
 * @param key - The translation key to validate.
 * @param obj - The translation dictionary to check against. Defaults to English translations (`en`).
 * @throws Error if the key is invalid or does not map to a string.
 */
const isTranslationKey = (key: string, obj: Record<string, unknown> = en): void => {
  if (!key.includes('.')) return

  const parts = key.split('.')
  let current: unknown = obj

  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      throw new BadRequestError({
        key: `${path}.invalid_key`,
        variables: { key },
      })
    }

    current = (current as Record<string, unknown>)[part]
  }

  if (typeof current !== 'string') {
    throw new BadRequestError({
      key: `${path}.invalid_key_type`,
      variables: { key },
    })
  }
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
 * Formats an error message into a consistent string format.
 *
 * Behavior:
 * - If `message` is a valid translation key → returns a serialized JSON string.
 * - If `message` is a plain string without matching translation → returns it as-is.
 * - If `message` is a `TranslationParams` object → serializes its key + variables.
 *
 * @param message - The message to format, either a string or a `TranslationParams` object.
 * @returns A string suitable for logs, responses, or error handling.
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
