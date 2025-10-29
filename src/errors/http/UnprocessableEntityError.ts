import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **UnprocessableEntityError (422)**
 *
 * ### When to Use
 * - Thrown when a request is syntactically valid but semantically invalid.
 * - Example: failed validation after parsing JSON body.
 */
export class UnprocessableEntityError extends TrackPlayError {
  constructor(message: string | Translatable = 'Unprocessable entity', details?: unknown) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Unprocessable Entity', details)
  }
}
