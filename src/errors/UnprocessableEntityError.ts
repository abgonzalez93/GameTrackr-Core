import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { TrackPlayError } from './TrackPlayError.js'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **UnprocessableEntityError (422)**
 *
 * ### When to Use
 * - Thrown when a request is syntactically valid but semantically invalid.
 * - Example: failed validation after parsing JSON body.
 */
export class UnprocessableEntityError extends TrackPlayError {
  constructor(message: string | TranslationOptions = 'Unprocessable entity', details?: unknown) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Unprocessable Entity', details)
  }
}
