import { TrackPlayError } from './base.error.ts'
import { HTTP_STATUS } from '#constants/httpStatus.constant'
import { type Translatable } from '#types/translate.type'

export class BadRequestError extends TrackPlayError {
  constructor(message: string | Translatable = 'Bad request', details?: unknown) {
    super(message, HTTP_STATUS.BAD_REQUEST, 'Bad Request', details)
  }
}

export class ConflictError extends TrackPlayError {
  constructor(message: string | Translatable = 'Conflict', details?: unknown) {
    super(message, HTTP_STATUS.CONFLICT, 'Conflict', details)
  }
}

export class ForbiddenError extends TrackPlayError {
  constructor(message: string | Translatable = 'Forbidden', details?: unknown) {
    super(message, HTTP_STATUS.FORBIDDEN, 'Forbidden', details)
  }
}

export class NotFoundError extends TrackPlayError {
  constructor(message: string | Translatable = 'Not found', details?: unknown) {
    super(message, HTTP_STATUS.NOT_FOUND, 'Not Found', details)
  }
}

export class TooManyRequestsError extends TrackPlayError {
  constructor(message: string | Translatable = 'Too many requests', details?: unknown) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, 'Too Many Requests', details)
  }
}

export class UnauthorizedError extends TrackPlayError {
  constructor(message: string | Translatable = 'Unauthorized', details?: unknown) {
    super(message, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized', details)
  }
}

export class UnprocessableEntityError extends TrackPlayError {
  constructor(message: string | Translatable = 'Unprocessable entity', details?: unknown) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Unprocessable Entity', details)
  }
}
