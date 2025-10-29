import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **BadRequestError (400)**
 *
 * ### When to Use
 * - Thrown when the client sends invalid or malformed data.
 * - Common in validation failures or missing parameters.
 *
 */
export class BadRequestError extends TrackPlayError {
  constructor(message: string | Translatable = 'Bad request', details?: unknown) {
    super(message, HTTP_STATUS.BAD_REQUEST, 'Bad Request', details)
  }
}
