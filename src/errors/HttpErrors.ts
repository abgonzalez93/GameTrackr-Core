import { HTTP_STATUS } from '@constants/index'
import { ApiError } from './ApiError'

/**
 * Error representing a 400 Bad Request.
 *
 * @class
 * @extends ApiError
 * @module errors
 */
export class BadRequestError extends ApiError {
  constructor(message = 'Bad request', meta?: unknown) {
    super(message, HTTP_STATUS.BAD_REQUEST, meta)
    this.name = 'BadRequestError'
  }
}

/**
 * Error representing a 401 Unauthorized.
 *
 * @class
 * @extends ApiError
 * @module errors
 */
export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized', meta?: unknown) {
    super(message, HTTP_STATUS.UNAUTHORIZED, meta)
    this.name = 'UnauthorizedError'
  }
}

/**
 * Error representing a 403 Forbidden.
 *
 * @class
 * @extends ApiError
 * @module errors
 */
export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', meta?: unknown) {
    super(message, HTTP_STATUS.FORBIDDEN, meta)
    this.name = 'ForbiddenError'
  }
}

/**
 * Error representing a 404 Not Found.
 *
 * @class
 * @extends ApiError
 * @module errors
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Not found', meta?: unknown) {
    super(message, HTTP_STATUS.NOT_FOUND, meta)
    this.name = 'NotFoundError'
  }
}

/**
 * Error representing a 409 Conflict.
 *
 * @class
 * @extends ApiError
 * @module errors
 */
export class ConflictError extends ApiError {
  constructor(message = 'Conflict', meta?: unknown) {
    super(message, HTTP_STATUS.CONFLICT, meta)
    this.name = 'ConflictError'
  }
}

/**
 * Error representing a 422 Unprocessable Entity.
 *
 * @class
 * @extends ApiError
 * @module errors
 */
export class UnprocessableEntityError extends ApiError {
  constructor(message = 'Unprocessable entity', meta?: unknown) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, meta)
    this.name = 'UnprocessableEntityError'
  }
}

/**
 * Error representing a 429 Too Many Requests.
 *
 * @class
 * @extends ApiError
 * @module errors
 */
export class TooManyRequestsError extends ApiError {
  constructor(message = 'Too many requests', meta?: unknown) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, meta)
    this.name = 'TooManyRequestsError'
  }
}
