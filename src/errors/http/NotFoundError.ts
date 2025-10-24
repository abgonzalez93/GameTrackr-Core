import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **NotFoundError (404)**
 *
 * ### When to Use
 * - Thrown when a requested resource cannot be found.
 * - Commonly used for missing database records or invalid IDs.
 */
export class NotFoundError extends TrackPlayError {
  constructor(message: string | Translatable = 'Not found', details?: Record<string, unknown>) {
    super(message, HTTP_STATUS.NOT_FOUND, 'Not Found', details)
  }
}
