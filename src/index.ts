import { connectRedis, createRedis } from '#clients/redis.client'
import { getClientEnv, getServerEnv } from '#config/getEnv.config'
import { getSecrets } from '#config/getSecrets.config'
import { createI18next, initI18next } from '#i18n/i18next.i18n'
import { initWinston } from '#logger/winston.logger'
import { apiFetch } from '#utils/fetch.util'
import { getBaseUrl } from '#utils/http.util'
import { getTranslationPath, t, translate } from '#utils/translate.util'
import { validateSchema } from '#utils/validate.util'

export const core = Object.freeze({
  connectRedis,
  createRedis,
  getSecrets,
  getClientEnv,
  getServerEnv,
  createI18next,
  initI18next,
  initWinston,
  apiFetch,
  getBaseUrl,
  getTranslationPath,
  t,
  translate,
  validateSchema,
})

export default core

export type { RedisClientType } from 'redis'
export type { i18n } from 'i18next'
export type { Logger } from 'winston'

export { connectRedis, createRedis } from '#clients/redis.client'
export { getClientEnv, getServerEnv } from '#config/getEnv.config'
export { getSecrets } from '#config/getSecrets.config'

export { GAME } from '#constants/game.constant'
export { HTTP_STATUS } from '#constants/httpStatus.constant'
export { JWT } from '#constants/jwt.constant'
export { LOGGER } from '#constants/logger.constant'
export { NODE_ENV } from '#constants/nodeEnv.constant'

export { TrackPlayError } from '#errors/base.error'

export {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
} from '#errors/http.error'

export { createI18next, initI18next } from '#i18n/i18next.i18n'
export { initWinston } from '#logger/winston.logger'

export type { BlacklistPort } from '#ports/blacklist.port'
export type { CategoryPort } from '#ports/category.port'
export type { GamePort } from '#ports/game.port'
export type { ProviderTokenPort } from '#ports/provider.port'
export type { TokenPort } from '#ports/token.port'

export { AuthorizationHeaderSchema, InternalAuthHeaderSchema } from '#schemas/auth.schema'

export {
  IdListSchema,
  IdSchema,
  IpAddressSchema,
  NodeEnvSchema,
  NonEmptyStringSchema,
  OptionalStringArraySchema,
  PortSchema,
  PositiveNumberSchema,
  UrlSchema,
} from '#schemas/base.schema'

export { CategoryListSchema, CategorySchema } from '#schemas/category.schema'
export { BaseServerEnvSchema } from '#schemas/config.schema'
export { CreateGameSchema, GameFiltersSchema, GameListSchema, GameSchema } from '#schemas/game.schema'
export { JWTExpSchema, JWTJtiSchema, JWTSubSchema } from '#schemas/jwt.schema'

export {
  ChangePasswordSchema,
  ChangeUsernameSchema,
  ForgotPasswordSchema,
  LoginInputSchema,
  LoginResponseSchema,
} from '#schemas/login.schema'

export { ProviderTokenSchema } from '#schemas/provider.schema'

export {
  TokenGenerateInputSchema,
  TokenPairSchema,
  TokenRevocationStatusInputSchema,
  TokenRevocationStatusSchema,
  TokenRevokeInputSchema,
  TokenRotateInputSchema,
} from '#schemas/token.schema'

export { TrackGameSchema } from '#schemas/trackGame.schema'
export { AdminUserSchema, CreateUserSchema, PublicUserSchema, UserEmailSchema, UserNameSchema } from '#schemas/user.schema'

export type { AuthorizationHeader, InternalAuthHeader } from '#types/auth.type'
export type { Id, IdList } from '#types/base.type'
export type { Category, CategoryList } from '#types/category.type'
export type { ConfigSchema, ConfigValues, InferConfig } from '#types/config.type'
export type { CreateGame, Game, GameFilters, GameList } from '#types/game.type'
export type { BaseURLOptions } from '#types/http.type'
export type { JWTExp, JWTJti, JWTSub } from '#types/jwt.type'
export type { LogLevel } from '#types/logger.type'
export type { ChangePassword, ChangeUsername, ForgotPassword, LoginInput, LoginResponse } from '#types/login.type'
export type { ProviderToken } from '#types/provider.type'

export type {
  TokenGenerateInput,
  TokenPair,
  TokenRevocationStatus,
  TokenRevocationStatusInput,
  TokenRevokeInput,
  TokenRotateInput,
} from '#types/token.type'

export type { TrackGame } from '#types/trackGame.type'
export type { Translatable, TranslationVariables } from '#types/translate.type'
export type { AdminUser, CreateUser, PublicUser, UserEmail, UserName } from '#types/user.type'

export { apiFetch } from '#utils/fetch.util'
export { getBaseUrl } from '#utils/http.util'
export { getTranslationPath, t, translate } from '#utils/translate.util'
export { validateSchema } from '#utils/validate.util'
