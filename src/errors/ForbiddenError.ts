import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { TrackPlayError } from './TrackPlayError.js'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **ForbiddenError (403)**
 *
 * ### When to Use
 * - Thrown when the user is authenticated but lacks permission
 *   to perform the requested operation.
 */
export class ForbiddenError extends TrackPlayError {
  constructor(message: string | TranslationOptions = 'Forbidden', details?: unknown) {
    super(message, HTTP_STATUS.FORBIDDEN, 'Forbidden', details)
  }
}
