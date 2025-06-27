import i18next, { i18n as I18nInstance } from 'i18next'
import { TrackPlayError } from '@errors/index'
import { en, es } from './locales'

let i18nInstance: I18nInstance | null = null

/**
 * Initializes the i18n instance with core translations.
 *
 * This should be called once per service at startup.
 *
 * @param initialLang - Initial language (default: 'en')
 */
export const createI18n = async (initialLang = 'en'): Promise<I18nInstance> => {
  if (i18nInstance) return i18nInstance

  i18nInstance = i18next.createInstance()

  await i18nInstance.init({
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

  return i18nInstance
}

/**
 * Returns the initialized i18n instance.
 *
 * @throws If `createI18n()` has not been called yet.
 */
export const getI18n = (): I18nInstance => {
  if (!i18nInstance) throw new TrackPlayError('i18n has not been initialized. Call createI18n() first.')
  return i18nInstance
}

/**
 * Changes the current language.
 *
 * @param lang - Language code (e.g. 'en', 'es')
 */
export const setLanguage = (lang: string): void => {
  if (!i18nInstance) throw new TrackPlayError('i18n has not been initialized. Call createI18n() first.')
  i18nInstance.changeLanguage(lang)
}
