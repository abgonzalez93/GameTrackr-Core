import { TrackPlayError } from '../base/TrackPlayError.ts'
import { HTTP_STATUS } from '#constants/httpStatus'
import { type Translatable } from '#types/translate/Translatable'

/**
 * **TooManyRequestsError (429)**
 *
 * ### When to Use
 * - Thrown when a user exceeds rate limits or throttling thresholds.
 * - Typically used in APIs enforcing request quotas.
 */
export class TooManyRequestsError extends TrackPlayError {
  constructor(message: string | Translatable = 'Too many requests', details?: Record<string, unknown>) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, 'Too Many Requests', details)
  }
}
