import { HTTP_STATUS } from '@constants/index'
import { ApiError } from './ApiError'

/**
 * Represents an HTTP 400 Bad Request error.
 *
 * Typically thrown when the client sends invalid data.
 *
 * @class BadRequestError
 * @extends ApiError
 *
 * @example
 * throw new BadRequestError('Missing required fields', { fields: ['email', 'password'] })
 */
export class BadRequestError extends ApiError {
  constructor(message = 'Bad request', meta?: unknown) {
    super(message, HTTP_STATUS.BAD_REQUEST, meta)
    this.name = 'BadRequestError'
  }
}

/**
 * Represents an HTTP 401 Unauthorized error.
 *
 * Thrown when authentication is required but missing or invalid.
 *
 * @class UnauthorizedError
 * @extends ApiError
 *
 * @example
 * throw new UnauthorizedError('Invalid credentials')
 */
export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized', meta?: unknown) {
    super(message, HTTP_STATUS.UNAUTHORIZED, meta)
    this.name = 'UnauthorizedError'
  }
}

/**
 * Represents an HTTP 403 Forbidden error.
 *
 * Thrown when the user is authenticated but not authorized to access the resource.
 *
 * @class ForbiddenError
 * @extends ApiError
 *
 * @example
 * throw new ForbiddenError('Access denied')
 */
export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', meta?: unknown) {
    super(message, HTTP_STATUS.FORBIDDEN, meta)
    this.name = 'ForbiddenError'
  }
}

/**
 * Represents an HTTP 404 Not Found error.
 *
 * Thrown when a requested resource does not exist.
 *
 * @class NotFoundError
 * @extends ApiError
 *
 * @example
 * throw new NotFoundError('User not found')
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Not found', meta?: unknown) {
    super(message, HTTP_STATUS.NOT_FOUND, meta)
    this.name = 'NotFoundError'
  }
}

/**
 * Represents an HTTP 409 Conflict error.
 *
 * Thrown when a request could not be completed due to a conflict with the current state of the resource.
 *
 * @class ConflictError
 * @extends ApiError
 *
 * @example
 * throw new ConflictError('Username already exists')
 */
export class ConflictError extends ApiError {
  constructor(message = 'Conflict', meta?: unknown) {
    super(message, HTTP_STATUS.CONFLICT, meta)
    this.name = 'ConflictError'
  }
}

/**
 * Represents an HTTP 422 Unprocessable Entity error.
 *
 * Thrown when the server understands the request but is unable to process it due to semantic errors.
 *
 * @class UnprocessableEntityError
 * @extends ApiError
 *
 * @example
 * throw new UnprocessableEntityError('Validation failed', { errors: { email: 'Invalid format' } })
 */
export class UnprocessableEntityError extends ApiError {
  constructor(message = 'Unprocessable entity', meta?: unknown) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, meta)
    this.name = 'UnprocessableEntityError'
  }
}

/**
 * Represents an HTTP 429 Too Many Requests error.
 *
 * Thrown when the user has sent too many requests in a given amount of time (rate limiting).
 *
 * @class TooManyRequestsError
 * @extends ApiError
 *
 * @example
 * throw new TooManyRequestsError('Rate limit exceeded')
 */
export class TooManyRequestsError extends ApiError {
  constructor(message = 'Too many requests', meta?: unknown) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, meta)
    this.name = 'TooManyRequestsError'
  }
}
