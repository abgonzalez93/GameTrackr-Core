import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

export class SecretValidationError extends TrackPlayError {
  constructor(message: string | Translatable = 'Secret validation', details?: unknown) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Secret Validation', details)
  }
}
