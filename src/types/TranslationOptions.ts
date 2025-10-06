import { TranslationVariables } from './TranslationVariables.js'

/**
 * **TranslationOptions**
 *
 * Defines a structured and serializable representation of a translatable message.
 *
 * This interface provides a consistent way to describe a translation key
 * and its associated runtime interpolation variables. It is commonly used
 * in error messages, logs, and user-facing strings throughout TrackPlay services.
 *
 * ### Responsibilities
 * - Store the **translation key** identifying a localized message.
 * - Optionally include **variables** to interpolate dynamic content.
 * - Enable structured error reporting and i18n serialization across layers.
 *
 * @property key - Translation key path (e.g., `"core.errors.invalid_token"`).
 * @property variables - Optional placeholder map for runtime interpolation.
 *
 * @see {@link TranslationVariables}
 */
export interface TranslationOptions {
  key: string
  variables?: TranslationVariables
}
