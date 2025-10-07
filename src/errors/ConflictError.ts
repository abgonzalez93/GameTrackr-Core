import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { TrackPlayError } from './TrackPlayError.js'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **ConflictError (409)**
 *
 * ### When to Use
 * - Thrown when a request cannot be completed due to
 *   a conflict with the current state of a resource.
 * - Example: attempting to register an already existing email.
 */
export class ConflictError extends TrackPlayError {
  constructor(message: string | TranslationOptions = 'Conflict', details?: unknown) {
    super(message, HTTP_STATUS.CONFLICT, 'Conflict', details)
  }
}
