import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { TrackPlayError } from './TrackPlayError.js'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **NotFoundError (404)**
 *
 * ### When to Use
 * - Thrown when a requested resource cannot be found.
 * - Commonly used for missing database records or invalid IDs.
 */
export class NotFoundError extends TrackPlayError {
  constructor(message: string | TranslationOptions = 'Not found', details?: unknown) {
    super(message, HTTP_STATUS.NOT_FOUND, 'Not Found', details)
  }
}
