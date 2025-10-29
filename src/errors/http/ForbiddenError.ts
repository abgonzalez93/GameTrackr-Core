import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **ForbiddenError (403)**
 *
 * ### When to Use
 * - Thrown when the user is authenticated but lacks permission
 *   to perform the requested operation.
 */
export class ForbiddenError extends TrackPlayError {
  constructor(message: string | Translatable = 'Forbidden', details?: unknown) {
    super(message, HTTP_STATUS.FORBIDDEN, 'Forbidden', details)
  }
}
