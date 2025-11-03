import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

export class ForbiddenError extends TrackPlayError {
  constructor(message: string | Translatable = 'Forbidden', details?: unknown) {
    super(message, HTTP_STATUS.FORBIDDEN, 'Forbidden', details)
  }
}
