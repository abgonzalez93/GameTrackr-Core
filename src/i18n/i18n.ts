import i18next, { i18n as I18nInstance } from 'i18next'
import { en, es } from './locales'

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
 * @returns A new uninitialized {@link I18nInstance}.
 *
 */
export const createI18n = (): I18nInstance => {
  return i18next.createInstance()
}

/**
 * **Initializes an i18n instance with default translations**
 *
 * Configures a given {@link I18nInstance} with English (`en`) and Spanish (`es`)
 * resources, sets up a fallback language, and enables safe interpolation.
 *
 * ### Responsibilities
 * - Loads translation dictionaries for supported locales.
 * - Defines a default language (English by default).
 * - Configures interpolation settings (disabling HTML escaping for safety).
 *
 * ### Parameters
 * @param instance - A fresh {@link I18nInstance} created via {@link createI18n}.
 * @param initialLang - Optional initial language code (defaults to `'en'`).
 *
 * ### Returns
 * The same {@link I18nInstance}, fully initialized and ready for use.
 *
 */
export const initI18n = async (instance: I18nInstance, initialLang: string = 'en'): Promise<I18nInstance> => {
  await instance.init({
    lng: initialLang,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    interpolation: {
      escapeValue: false,
    },
  })

  return instance
}
