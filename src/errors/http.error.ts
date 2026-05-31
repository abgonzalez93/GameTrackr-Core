import { TrackPlayError, type BaseErrorOptions } from './base.error.ts'
import { HTTP_STATUS } from '#constants/http.constant'

export interface HttpErrorOptions extends BaseErrorOptions {
  message?: string
}

export interface HttpErrorConstructor {
  new (opts?: HttpErrorOptions): TrackPlayError
}

export class BadRequestError extends TrackPlayError {
  constructor(opts: HttpErrorOptions = {}) {
    super({
      message: opts.message || 'Bad Request',
      status: HTTP_STATUS.BAD_REQUEST,
      code: 'BAD_REQUEST',
      title: 'Bad Request',
      i18nKey: opts.i18nKey || 'core.errors.bad_request',
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class UnauthorizedError extends TrackPlayError {
  constructor(opts: HttpErrorOptions = {}) {
    super({
      message: opts.message || 'Unauthorized',
      status: HTTP_STATUS.UNAUTHORIZED,
      code: 'UNAUTHORIZED',
      title: 'Unauthorized',
      i18nKey: opts.i18nKey || 'core.errors.unauthorized',
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class ForbiddenError extends TrackPlayError {
  constructor(opts: HttpErrorOptions = {}) {
    super({
      message: opts.message || 'Forbidden',
      status: HTTP_STATUS.FORBIDDEN,
      code: 'FORBIDDEN',
      title: 'Forbidden',
      i18nKey: opts.i18nKey || 'core.errors.forbidden',
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class NotFoundError extends TrackPlayError {
  constructor(opts: HttpErrorOptions = {}) {
    super({
      message: opts.message || 'Resource not found',
      status: HTTP_STATUS.NOT_FOUND,
      code: 'NOT_FOUND',
      title: 'Resource not found',
      i18nKey: opts.i18nKey || 'core.errors.not_found',
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class ConflictError extends TrackPlayError {
  constructor(opts: HttpErrorOptions = {}) {
    super({
      message: opts.message || 'Conflict',
      status: HTTP_STATUS.CONFLICT,
      code: 'CONFLICT',
      title: 'Conflict',
      i18nKey: opts.i18nKey || 'core.errors.conflict',
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class ValidationError extends TrackPlayError {
  constructor(opts: HttpErrorOptions = {}) {
    super({
      message: opts.message || 'Validation failed',
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: 'VALIDATION_FAILED',
      title: 'Validation Failed',
      i18nKey: opts.i18nKey || 'core.errors.validation_failed',
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class TooManyRequestsError extends TrackPlayError {
  constructor(opts: HttpErrorOptions = {}) {
    super({
      message: opts.message || 'Too many requests',
      status: HTTP_STATUS.TOO_MANY_REQUESTS,
      code: 'TOO_MANY_REQUESTS',
      title: 'Too Many Requests',
      i18nKey: opts.i18nKey || 'core.errors.too_many_requests',
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}
