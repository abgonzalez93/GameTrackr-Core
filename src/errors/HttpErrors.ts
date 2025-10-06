import { type TranslationOptions } from '#types/TranslationOptions'
import { TrackPlayError } from './TrackPlayError.js'
import { HTTP_STATUS } from '#constants/httpStatus'

/**
 * **HTTP Error Classes**
 *
 * Defines domain-level error classes representing common HTTP response statuses.
 *
 * ### Scope
 * - Provides strongly typed, semantically meaningful error classes
 *   that map directly to HTTP status codes.
 * - Centralizes error creation for controllers, services, and middleware.
 *
 * ### Notes
 * - All classes extend {@link TrackPlayError}, inheriting translation support
 *   and structured metadata (`statusCode`, `statusName`, `details`).
 * - Each subclass sets its corresponding {@link HTTP_STATUS} code and label.
 * - The `message` parameter can be either a plain string or a {@link TranslationOptions}
 *   object for localized error responses.
 *
 * @see {@link TrackPlayError}
 * @see {@link HTTP_STATUS}
 */

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

/**
 * **UnauthorizedError (401)**
 *
 * ### When to Use
 * - Thrown when authentication credentials are missing or invalid.
 * - Indicates that re-authentication may resolve the issue.
 */
export class UnauthorizedError extends TrackPlayError {
  constructor(message: string | TranslationOptions = 'Unauthorized', details?: unknown) {
    super(message, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized', details)
  }
}

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
