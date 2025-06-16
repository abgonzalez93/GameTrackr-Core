import { TrackPlayError } from './TrackPlayError'
import { HTTP_STATUS } from '@constants/index'

/**
 * Represents an HTTP 400 Bad Request error.
 *
 * Typically thrown when the client sends invalid data.
 *
 * @class BadRequestError
 * @extends TrackPlayError
 */
export class BadRequestError extends TrackPlayError {
  constructor(message = 'Bad request', details?: unknown) {
    super(message, HTTP_STATUS.BAD_REQUEST, details)
  }
}

/**
 * Represents an HTTP 401 Unauthorized error.
 *
 * Thrown when authentication is required but missing or invalid.
 *
 * @class UnauthorizedError
 * @extends TrackPlayError
 */
export class UnauthorizedError extends TrackPlayError {
  constructor(message = 'Unauthorized', details?: unknown) {
    super(message, HTTP_STATUS.UNAUTHORIZED, details)
  }
}

/**
 * Represents an HTTP 403 Forbidden error.
 *
 * Thrown when the user is authenticated but not authorized to access the resource.
 *
 * @class ForbiddenError
 * @extends TrackPlayError
 */
export class ForbiddenError extends TrackPlayError {
  constructor(message = 'Forbidden', details?: unknown) {
    super(message, HTTP_STATUS.FORBIDDEN, details)
  }
}

/**
 * Represents an HTTP 404 Not Found error.
 *
 * Thrown when a requested resource does not exist.
 *
 * @class NotFoundError
 * @extends TrackPlayError
 */
export class NotFoundError extends TrackPlayError {
  constructor(message = 'Not found', details?: unknown) {
    super(message, HTTP_STATUS.NOT_FOUND, details)
  }
}

/**
 * Represents an HTTP 409 Conflict error.
 *
 * Thrown when a request could not be completed due to a conflict with the current state of the resource.
 *
 * @class ConflictError
 * @extends TrackPlayError
 */
export class ConflictError extends TrackPlayError {
  constructor(message = 'Conflict', details?: unknown) {
    super(message, HTTP_STATUS.CONFLICT, details)
  }
}

/**
 * Represents an HTTP 422 Unprocessable Entity error.
 *
 * Thrown when the server understands the request but is unable to process it due to semantic errors.
 *
 * @class UnprocessableEntityError
 * @extends TrackPlayError
 */
export class UnprocessableEntityError extends TrackPlayError {
  constructor(message = 'Unprocessable entity', details?: unknown) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, details)
  }
}

/**
 * Represents an HTTP 429 Too Many Requests error.
 *
 * Thrown when the user has sent too many requests in a given amount of time (rate limiting).
 *
 * @class TooManyRequestsError
 * @extends TrackPlayError
 */
export class TooManyRequestsError extends TrackPlayError {
  constructor(message = 'Too many requests', details?: unknown) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, details)
  }
}
