import { HTTP_STATUS } from '#constants/httpStatus.constant'
import { type Translatable } from '#types/translate.type'

export class TrackPlayError extends Error {
  public readonly statusCode: number
  public readonly statusName: string
  public readonly details?: unknown
  public readonly i18n?: Translatable

  constructor(
    message: string | Translatable,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    statusName: string = 'Internal Server',
    details?: unknown,
  ) {
    super(typeof message === 'string' ? message : message.key)

    this.name = `${statusCode} ${statusName}`
    this.statusCode = statusCode
    this.statusName = statusName
    this.details = details
    this.i18n = typeof message === 'string' ? undefined : message

    if (Error.captureStackTrace) Error.captureStackTrace(this, new.target)
    Object.freeze(this)
  }
}
