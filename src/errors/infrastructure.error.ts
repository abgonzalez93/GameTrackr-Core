import { TrackPlayError, type BaseErrorOptions } from './base.error.ts'
import { HTTP_STATUS } from '#constants/http.constant'

export interface InfrastructureErrorOptions extends BaseErrorOptions {
  message?: string
  code?: string
}

class InternalServerError extends TrackPlayError {
  constructor(opts: InfrastructureErrorOptions = {}) {
    super({
      message: opts.message || 'Internal Server Error',
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code: opts.code || 'INTERNAL_SERVER_ERROR',
      title: 'Internal Server Error',
      i18nKey: opts.i18nKey || 'core.errors.internal_server_error',
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class RedisConnectionError extends InternalServerError {
  constructor(opts: InfrastructureErrorOptions = {}) {
    super({
      message: opts.message || 'Redis Connection Error',
      code: 'REDIS_CONNECTION_ERROR',
      i18nKey: opts.i18nKey,
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class DatabaseConnectionError extends InternalServerError {
  constructor(opts: InfrastructureErrorOptions = {}) {
    super({
      message: opts.message || 'Database Connection Error',
      code: 'DATABASE_CONNECTION_ERROR',
      i18nKey: opts.i18nKey,
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class ExternalServiceError extends InternalServerError {
  constructor(opts: InfrastructureErrorOptions = {}) {
    super({
      message: opts.message || 'External Service Error',
      code: 'EXTERNAL_SERVICE_ERROR',
      i18nKey: opts.i18nKey,
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class FileSystemError extends InternalServerError {
  constructor(opts: InfrastructureErrorOptions = {}) {
    super({
      message: opts.message || 'File System Error',
      code: 'FILE_SYSTEM_ERROR',
      i18nKey: opts.i18nKey,
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class ConfigurationError extends InternalServerError {
  constructor(opts: InfrastructureErrorOptions = {}) {
    super({
      message: opts.message || 'Configuration Error',
      code: 'CONFIGURATION_ERROR',
      i18nKey: opts.i18nKey,
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}

export class PersistenceError extends InternalServerError {
  constructor(opts: InfrastructureErrorOptions = {}) {
    super({
      message: opts.message || 'Persistence Error',
      code: 'PERSISTENCE_ERROR',
      i18nKey: opts.i18nKey,
      i18nArgs: opts.i18nArgs,
      errors: opts.errors,
    })
  }
}
