import { type TFunction } from 'i18next'
import { TrackPlayError } from '#errors/base.error'

export interface TranslateOptions {
  i18nArgs?: Record<string, unknown>
  fallback?: string
}

export const translate = (t: TFunction, key: unknown, options: TranslateOptions = {}): string => {
  if (typeof key !== 'string' || key.trim().length === 0) return options.fallback ?? ''

  return t(key, {
    ...(options.i18nArgs ?? {}),
    defaultValue: options.fallback ?? key,
  })
}

export const translateErrorMessage = (t: TFunction, error: unknown): string => {
  if (error instanceof TrackPlayError)
    return translate(t, error.i18nKey, { i18nArgs: error.i18nArgs, fallback: error.message })
  if (error instanceof Error) return error.message
  return String(error)
}
