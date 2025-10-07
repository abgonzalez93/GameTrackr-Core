import { type TranslationOptions } from '#types/translate/TranslationOptions'
import { TrackPlayError } from './TrackPlayError.js'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **TooManyRequestsError (429)**
 *
 * ### When to Use
 * - Thrown when a user exceeds rate limits or throttling thresholds.
 * - Typically used in APIs enforcing request quotas.
 */
export class TooManyRequestsError extends TrackPlayError {
  constructor(message: string | TranslationOptions = 'Too many requests', details?: unknown) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, 'Too Many Requests', details)
  }
}
