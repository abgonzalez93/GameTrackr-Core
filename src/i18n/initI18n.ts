import { type i18n } from 'i18next'
import { en, es } from './locales/index.ts'

export const initI18n = async (i18n: i18n, initialLang = 'en'): Promise<i18n> => {
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
