import { TrackPlayError } from './base.error.ts'
import { HTTP_STATUS } from '#constants/httpStatus.constant'
import { type Translatable } from '#types/translate.type'

export class EnvValidationError extends TrackPlayError {
  constructor(message: string | Translatable = 'Environment validation', details?: unknown) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Environment Validation', details)
  }
}

export class SecretValidationError extends TrackPlayError {
  constructor(message: string | Translatable = 'Secret validation', details?: unknown) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Secret Validation', details)
  }
}
