import i18next, { i18n as I18nInstance } from 'i18next'
import { en, es } from './locales'

/**
 * Creates a new i18n instance.
 *
 * This function returns a fresh instance of i18next.
 * It does not initialize it — use `initI18n` after creation.
 *
 * @returns A new uninitialized i18n instance
 */
export const createI18n = (): I18nInstance => {
  return i18next.createInstance()
}

/**
 * Initializes the provided i18n instance with default translations and options.
 *
 * @param instance - A fresh i18n instance (created with `createI18n`)
 * @param initialLang - Initial language code (default: 'en')
 * @returns The initialized i18n instance
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
