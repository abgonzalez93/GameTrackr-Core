import { type i18n, type InitOptions, createInstance } from 'i18next'

export const createI18next = (): i18n => createInstance()

export const initI18next = async (i18n: i18n, lng?: string, options: InitOptions = {}): Promise<i18n> => {
  const { en, es } = await import('./locales/index.ts')

  await i18n.init({
    lng,
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
