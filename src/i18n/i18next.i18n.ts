import { type i18n, type InitOptions, createInstance } from 'i18next'
import { en, es } from './locales/index.ts'

export const createI18next = (): i18n => createInstance()

export const initI18next = async (i18n: i18n, initialLang = 'en', options: InitOptions = {}): Promise<i18n> => {
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
    ...options,
  })

  return i18n
}
