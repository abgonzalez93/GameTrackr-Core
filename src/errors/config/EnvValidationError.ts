import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

export class EnvValidationError extends TrackPlayError {
  constructor(message: string | Translatable = 'Environment validation', details?: unknown) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Environment Validation', details)
  }
}
