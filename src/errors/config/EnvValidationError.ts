import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **EnvValidationError (500)**
 *
 * ### When to Use
 * - Thrown when environment variable validation fails during application startup.
 * - Typically occurs when required variables are missing, malformed, or invalid
 *   according to a Zod schema in {@link createEnvConfig}.
 *
 */
export class EnvValidationError extends TrackPlayError {
  constructor(message: string | Translatable = 'Environment validation', details?: Record<string, unknown>) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Environment Validation', details)
  }
}
