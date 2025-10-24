import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **ConflictError (409)**
 *
 * ### When to Use
 * - Thrown when a request cannot be completed due to
 *   a conflict with the current state of a resource.
 * - Example: attempting to register an already existing email.
 */
export class ConflictError extends TrackPlayError {
  constructor(message: string | Translatable = 'Conflict', details?: Record<string, unknown>) {
    super(message, HTTP_STATUS.CONFLICT, 'Conflict', details)
  }
}
