import { en, es } from './locales/index.js'
import { type i18n } from 'i18next'

/**
 * **Initializes an i18n instance with default translations**
 *
 * Configures a given {@link i18n} with English (`en`) and Spanish (`es`)
 * resources, sets up a fallback language, and enables safe interpolation.
 *
 * ### Responsibilities
 * - Loads translation dictionaries for supported locales.
 * - Defines a default language (English by default).
 * - Configures interpolation settings (disabling HTML escaping for safety).
 *
 * ### Parameters
 * @param instance - A fresh {@link i18n} created via {@link i18next.createInstance}.
 * @param initialLang - Optional initial language code (defaults to `'en'`).
 *
 * ### Returns
 * The same {@link i18n}, fully initialized and ready for use.
 *
 */
export const initI18n = async (i18n: i18n, initialLang: string = 'en'): Promise<i18n> => {
  await i18n.init({
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

  return i18n
}
