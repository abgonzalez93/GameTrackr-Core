import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **SecretValidationError (500)**
 *
 * ### When to Use
 * - Thrown when a Docker secret (or equivalent external secret) is missing,
 *   empty, or unreadable during application startup.
 * - Used by {@link getSecrets} and other secret-loading utilities.
 *
 */
export class SecretValidationError extends TrackPlayError {
  constructor(message: string | Translatable = 'Secret validation', details?: unknown) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Secret Validation', details)
  }
}
