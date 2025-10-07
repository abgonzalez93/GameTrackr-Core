import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { TrackPlayError } from './TrackPlayError.js'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **UnauthorizedError (401)**
 *
 * ### When to Use
 * - Thrown when authentication credentials are missing or invalid.
 * - Indicates that re-authentication may resolve the issue.
 */
export class UnauthorizedError extends TrackPlayError {
  constructor(message: string | TranslationOptions = 'Unauthorized', details?: unknown) {
    super(message, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized', details)
  }
}
