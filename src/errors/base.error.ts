import { isRecord } from '#utils/common.util'

export interface BaseErrorOptions {
  i18nKey?: string
  i18nArgs?: Record<string, unknown>
  errors?: Record<string, unknown> | unknown[]
}

export interface TrackPlayErrorOptions extends BaseErrorOptions {
  message: string
  status: number
  code: string
  title?: string
}

const sanitizeValue = (value: unknown): Record<string, unknown> | unknown[] | unknown => {
  if (value instanceof Error) return { message: value.message, name: value.name }

  if (Array.isArray(value)) return value.map(sanitizeValue)

  if (isRecord(value)) {
    const sanitized: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(value)) {
      sanitized[key] = sanitizeValue(val)
    }

    return sanitized
  }

  return value
}

const sanitizeErrors = (errors: unknown): Record<string, unknown> | unknown[] | undefined => {
  if (!errors) return undefined
  const sanitized = sanitizeValue(errors)
  return Array.isArray(sanitized) || isRecord(sanitized) ? sanitized : undefined
}

export class TrackPlayError extends Error {
  public readonly status: number
  public readonly code: string
  public readonly title: string
  public readonly i18nKey: string
  public readonly i18nArgs?: Record<string, unknown>
  public readonly errors?: Record<string, unknown> | unknown[]

  constructor({ message, status, i18nKey, i18nArgs, errors, code, title }: TrackPlayErrorOptions) {
    super(message)

    this.name = this.constructor.name
    this.code = code
    this.title = title || 'System Error'
    this.status = status
    this.i18nKey = i18nKey || 'core.errors.generic'
    this.i18nArgs = i18nArgs
    this.errors = sanitizeErrors(errors)

    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
  }
}
