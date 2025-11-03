import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

export class NotFoundError extends TrackPlayError {
  constructor(message: string | Translatable = 'Not found', details?: unknown) {
    super(message, HTTP_STATUS.NOT_FOUND, 'Not Found', details)
  }
}
