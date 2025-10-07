import { type TranslationVariables } from './TranslationVariables.js'

/**
 * **TranslationOptions**
 *
 * Represents a structured and serializable definition of a translatable message.
 *
 * This interface provides a standardized way to define a translation key and
 * its optional runtime interpolation variables. It is used extensively across
 * TrackPlay services for error handling, logging, and internationalization (i18n).
 *
 * ### Responsibilities
 * - Store the **translation key** identifying a localized message.
 * - Optionally include **interpolation variables** for dynamic values.
 * - Enable consistent serialization of i18n data across layers.
 *
 * ### Notes
 * - The `key` must correspond to a valid entry in the translation dictionary.
 * - The `variables` map provides placeholder replacements for the message.
 * - Often serialized using `formatErrorMessage()` or consumed by `translate()`.
 *
 * @property key - Translation key path (e.g., `"core.errors.invalid_token"`).
 * @property variables - Optional mapping of placeholder names to runtime values.
 *
 * @see {@link TranslationVariables}
 * @see {@link formatErrorMessage}
 * @see {@link translate}
 */
export interface TranslationOptions {
  key: string
  variables?: TranslationVariables
}
