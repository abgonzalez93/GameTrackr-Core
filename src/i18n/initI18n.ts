import type { i18n, InitOptions } from 'i18next'
import { en, es } from './locales/index.ts'

export const initI18n = async (i18n: i18n, initialLang = 'en', options: InitOptions = {}): Promise<i18n> => {
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
