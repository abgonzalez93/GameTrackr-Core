import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { TrackPlayError } from './TrackPlayError.js'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **BadRequestError (400)**
 *
 * ### When to Use
 * - Thrown when the client sends invalid or malformed data.
 * - Common in validation failures or missing parameters.
 *
 */
export class BadRequestError extends TrackPlayError {
  constructor(message: string | TranslationOptions = 'Bad request', details?: unknown) {
    super(message, HTTP_STATUS.BAD_REQUEST, 'Bad Request', details)
  }
}
