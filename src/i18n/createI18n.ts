import i18next, { type i18n } from 'i18next'

/**
 * **Creates a new i18n instance**
 *
 * Factory function that returns a **fresh, uninitialized** instance of {@link i18next}.
 *
 * ### Responsibilities
 * - Provides isolation between services or test environments.
 * - Ensures that configuration and resource loading are handled explicitly
 *   via {@link initI18n}.
 *
 * ### Notes
 * - This function **does not initialize** translations; call {@link initI18n}
 *   afterwards to load resources and configure default language.
 * - Useful for dependency injection in modular or multi-service setups.
 *
 * @returns A new uninitialized {@link i18n}.
 *
 */
export const createI18n = (): i18n => i18next.createInstance()
