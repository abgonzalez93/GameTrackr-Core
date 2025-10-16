import { type Translatable } from '#types/translate/Translatable'
import { type TranslationVariables } from '#types/translate/TranslationVariables'

/**
 * **t**
 *
 * Utility function for constructing a {@link Translatable} object.
 *
 * This helper simplifies the creation of translation payloads that can be
 * passed to errors, logs, or UI messages for localization.
 *
 * ### Responsibilities
 * - Ensure consistent structure for i18n translation keys and variables.
 * - Provide a type-safe factory for {@link Translatable} messages.
 *
 * @param key - Translation key (dot-notation path, e.g. `"auth.errors.invalid_token"`).
 * @param variables - Optional map of placeholder variables for runtime interpolation.
 * @returns A {@link Translatable} object containing the key and its variables.
 *
 * @see {@link Translatable}
 * @see {@link TranslationVariables}
 */
export const t = (key: string, variables?: TranslationVariables): Translatable => ({ key, variables })
