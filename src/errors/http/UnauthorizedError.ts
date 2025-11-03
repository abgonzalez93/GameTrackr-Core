import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

export class UnauthorizedError extends TrackPlayError {
  constructor(message: string | Translatable = 'Unauthorized', details?: unknown) {
    super(message, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized', details)
  }
}
