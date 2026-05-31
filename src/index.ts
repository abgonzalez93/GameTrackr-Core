export type { RedisClientType } from 'redis'
export type { TFunction, i18n } from 'i18next'
export type { Logger } from 'winston'

export { connectRedis, createRedis, type RedisClient } from '#clients/redis.client'
export { connectPrisma, createPrisma } from '#clients/prisma.client'
export { getClientEnv, getServerEnv, getCombinedServerEnv } from '#config/getEnv.config'
export { getSecrets } from '#config/getSecrets.config'

export { HTTP_STATUS } from '#constants/http.constant'
export { JWT } from '#constants/jwt.constant'
export { LOGGER } from '#constants/logger.constant'
export { ENVIRONMENT } from '#constants/environment.constant'

export { TrackPlayError } from '#errors/base.error'

export {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  TooManyRequestsError,
} from '#errors/http.error'

export {
  DatabaseConnectionError,
  RedisConnectionError,
  ExternalServiceError,
  FileSystemError,
  ConfigurationError,
  PersistenceError,
} from '#errors/infrastructure.error'

export { createI18next, initI18next } from '#i18n/i18next.i18n'
export { initWinston, type LogLevel } from '#logger/winston.logger'
export { initBufferLogger, type BufferLogger } from '#logger/buffer.logger'

export { AuthorizationHeaderSchema, InternalAuthHeaderSchema } from '#schemas/auth.schema'

export { IdSchema, UuidSchema, RequiredString, PositiveNumberSchema } from '#schemas/common.schema'
export { BaseServerEnvSchema, EmptySchema } from '#schemas/config.schema'
export { JWTExpSchema, JWTJtiSchema, JWTSubSchema } from '#schemas/jwt.schema'

export {
  TokenGenerateInputSchema,
  TokenPairSchema,
  TokenRevocationStatusInputSchema,
  TokenRevocationStatusSchema,
  TokenRevokeInputSchema,
  TokenRotateInputSchema,
} from '#schemas/token.schema'

export type { AuthorizationHeader, InternalAuthHeader } from '#types/auth.type'
export type { Id } from '#types/common.type'
export type { ConfigSchema, ConfigValues, BaseServerEnv, SchemaOutput } from '#types/config.type'
export type { JWTExp, JWTJti, JWTSub } from '#types/jwt.type'

export type {
  TokenGenerateInput,
  TokenPair,
  TokenRevocationStatus,
  TokenRevocationStatusInput,
  TokenRevokeInput,
  TokenRotateInput,
} from '#types/token.type'

export { getBaseUrl, type BaseURLOptions } from '#utils/http.util'
export { isRecord } from '#utils/common.util'
export { serializeError } from '#logger/serializers/error.serializer'
export { translate, translateErrorMessage, type TranslateOptions } from '#utils/translate.util'
export { validateSchema } from '#utils/validate.util'
