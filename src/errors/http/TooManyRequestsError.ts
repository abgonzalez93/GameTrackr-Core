import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

export class TooManyRequestsError extends TrackPlayError {
  constructor(message: string | Translatable = 'Too many requests', details?: unknown) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, 'Too Many Requests', details)
  }
}
