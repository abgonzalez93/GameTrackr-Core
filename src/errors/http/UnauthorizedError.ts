import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **UnauthorizedError (401)**
 *
 * ### When to Use
 * - Thrown when authentication credentials are missing or invalid.
 * - Indicates that re-authentication may resolve the issue.
 */
export class UnauthorizedError extends TrackPlayError {
  constructor(message: string | Translatable = 'Unauthorized', details?: Record<string, unknown>) {
    super(message, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized', details)
  }
}
