import { type i18n } from 'i18next'

/**
 * **i18n**
 *
 * Type re-export for the i18next internationalization instance.
 *
 * This enables TrackPlay services to reference the `i18n` type without
 * directly installing or importing from the `i18next` package.
 *
 * ### Use Case
 * Provides a consistent i18n type across services that utilize
 * localization features (e.g., error messages, middleware responses).
 *
 * @see {@link https://www.i18next.com/ | i18next Documentation}
 */
export type { i18n }
