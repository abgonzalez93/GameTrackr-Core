import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

export class ConflictError extends TrackPlayError {
  constructor(message: string | Translatable = 'Conflict', details?: unknown) {
    super(message, HTTP_STATUS.CONFLICT, 'Conflict', details)
  }
}
