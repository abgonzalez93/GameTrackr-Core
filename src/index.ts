import { connectRedis } from '#clients/redis/connectRedis'
import { createRedis } from '#clients/redis/createRedis'
import { getClientEnv } from '#config/getClientEnv'
import { getSecrets } from '#config/getSecrets'
import { getServerEnv } from '#config/getServerEnv'
import { createI18n } from '#i18n/createI18n'
import { initI18n } from '#i18n/initI18n'
import { createLogger } from '#logger/createLogger'
import { apiFetch } from '#utils/fetch/apiFetch'
import { getBaseUrl } from '#utils/http/getBaseUrl'
import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { t } from '#utils/translate/t'
import { translate } from '#utils/translate/translate'
import { validateSchema } from '#utils/validate/validateSchema'

/**
 * The functional core of the TrackPlay ecosystem.
 *
 * Provides the executable runtime API for initializing services,
 * managing configuration, creating clients, and performing
 * common operations such as logging, translation, and validation.
 *
 * @module core
 */
export const core = Object.freeze({
  // --- Clients ---
  connectRedis,
  createRedis,

  // --- Config ---
  getSecrets,
  getClientEnv,
  getServerEnv,

  // --- i18n ---
  createI18n,
  initI18n,

  // --- Logger ---
  createLogger,

  // --- Utils ---
  apiFetch,
  getBaseUrl,
  getTranslationPath,
  t,
  translate,
  validateSchema,
})

export default core

// --- External types ---
export { type RedisClientType } from 'redis'
export { type i18n } from 'i18next'
export { type Logger } from 'winston'

// --- Clients ---
export { connectRedis } from '#clients/redis/connectRedis'
export { createRedis } from '#clients/redis/createRedis'

// --- Config ---
export { getClientEnv } from '#config/getClientEnv'
export { getSecrets } from '#config/getSecrets'
export { getServerEnv } from '#config/getServerEnv'

// --- Constants ---
export { GAME } from '#constants/game'
export { HTTP_STATUS } from '#constants/httpStatus'
export { JWT } from '#constants/jwt'
export { LOGGER } from '#constants/logger'
export { NODE_ENV } from '#constants/nodeEnv'

// --- Errors ---
export { TrackPlayError } from '#errors/base/TrackPlayError'
export { BadRequestError } from '#errors/http/BadRequestError'
export { ConflictError } from '#errors/http/ConflictError'
export { ForbiddenError } from '#errors/http/ForbiddenError'
export { NotFoundError } from '#errors/http/NotFoundError'
export { TooManyRequestsError } from '#errors/http/TooManyRequestsError'
export { UnauthorizedError } from '#errors/http/UnauthorizedError'
export { UnprocessableEntityError } from '#errors/http/UnprocessableEntityError'

// --- i18n ---
export { createI18n } from '#i18n/createI18n'
export { initI18n } from '#i18n/initI18n'

// --- Logger ---
export { createLogger } from '#logger/createLogger'

// --- Ports ---
export { type BlacklistPort } from '#ports/BlacklistPort'
export { type CategoryPort } from '#ports/CategoryPort'
export { type GamePort } from '#ports/GamePort'
export { type ProviderTokenPort } from '#ports/ProviderTokenPort'
export { type TokenPort } from '#ports/TokenPort'

// --- Schemas ---
export { AuthorizationHeaderSchema } from '#schemas/auth/AuthorizationHeaderSchema'
export { InternalAuthHeaderSchema } from '#schemas/auth/InternalAuthHeaderSchema'
export { IdListSchema } from '#schemas/base/IdListSchema'
export { IdSchema } from '#schemas/base/IdSchema'
export { IpAddressSchema } from '#schemas/base/IpAddressSchema'
export { NodeEnvSchema } from '#schemas/base/NodeEnvSchema'
export { NonEmptyStringSchema } from '#schemas/base/NonEmptyStringSchema'
export { OptionalStringArraySchema } from '#schemas/base/OptionalStringArraySchema'
export { PortSchema } from '#schemas/base/PortSchema'
export { PositiveNumberSchema } from '#schemas/base/PositiveNumberSchema'
export { UrlSchema } from '#schemas/base/UrlSchema'
export { CategoryListSchema } from '#schemas/category/CategoryListSchema'
export { CategorySchema } from '#schemas/category/CategorySchema'
export { BaseServerEnvSchema } from '#schemas/config/BaseServerEnvSchema'
export { CreateGameSchema } from '#schemas/game/CreateGameSchema'
export { GameFiltersSchema } from '#schemas/game/GameFiltersSchema'
export { GameListSchema } from '#schemas/game/GameListSchema'
export { GameSchema } from '#schemas/game/GameSchema'
export { JWTExpSchema } from '#schemas/jwt/JWTExpSchema'
export { JWTJtiSchema } from '#schemas/jwt/JWTJtiSchema'
export { JWTSubSchema } from '#schemas/jwt/JWTSubSchema'
export { ChangePasswordSchema } from '#schemas/login/ChangePasswordSchema'
export { ChangeUsernameSchema } from '#schemas/login/ChangeUsernameSchema'
export { ForgotPasswordSchema } from '#schemas/login/ForgotPasswordSchema'
export { LoginInputSchema } from '#schemas/login/LoginInputSchema'
export { LoginResponseSchema } from '#schemas/login/LoginResponseSchema'
export { ProviderTokenSchema } from '#schemas/providers/ProviderTokenSchema'
export { TokenGenerateInputSchema } from '#schemas/token/TokenGenerateInputSchema'
export { TokenPairSchema } from '#schemas/token/TokenPairSchema'
export { TokenRevocationStatusInputSchema } from '#schemas/token/TokenRevocationStatusInputSchema'
export { TokenRevocationStatusSchema } from '#schemas/token/TokenRevocationStatusSchema'
export { TokenRevokeInputSchema } from '#schemas/token/TokenRevokeInputSchema'
export { TokenRotateInputSchema } from '#schemas/token/TokenRotateInputSchema'
export { TrackGameSchema } from '#schemas/trackGame/TrackGameSchema'
export { AdminUserSchema } from '#schemas/user/AdminUserSchema'
export { CreateUserSchema } from '#schemas/user/CreateUserSchema'
export { PublicUserSchema } from '#schemas/user/PublicUserSchema'
export { UserEmailSchema } from '#schemas/user/UserEmailSchema'
export { UserNameSchema } from '#schemas/user/UserNameSchema'

// --- Types ---
export { type AuthorizationHeader } from '#types/auth/AuthorizationHeader'
export { type InternalAuthHeader } from '#types/auth/InternalAuthHeader'
export { type Id } from '#types/base/Id'
export { type IdList } from '#types/base/IdList'
export { type Category } from '#types/category/Category'
export { type CategoryList } from '#types/category/CategoryList'
export { type ConfigSchema } from '#types/config/ConfigSchema'
export { type ConfigValues } from '#types/config/ConfigValues'
export { type InferConfig } from '#types/config/InferConfig'
export { type CreateGame } from '#types/game/CreateGame'
export { type Game } from '#types/game/Game'
export { type GameFilters } from '#types/game/GameFilters'
export { type GameList } from '#types/game/GameList'
export { type BaseURLOptions } from '#types/http/BaseURLOptions'
export { type JWTExp } from '#types/jwt/JWTExp'
export { type JWTJti } from '#types/jwt/JWTJti'
export { type JWTSub } from '#types/jwt/JWTSub'
export { type LogLevel } from '#types/logger/LogLevel'
export { type ChangePassword } from '#types/login/ChangePassword'
export { type ChangeUsername } from '#types/login/ChangeUsername'
export { type ForgotPassword } from '#types/login/ForgotPassword'
export { type LoginInput } from '#types/login/LoginInput'
export { type LoginResponse } from '#types/login/LoginResponse'
export { type ProviderToken } from '#types/providers/ProviderToken'
export { type TokenGenerateInput } from '#types/token/TokenGenerateInput'
export { type TokenPair } from '#types/token/TokenPair'
export { type TokenRevocationStatus } from '#types/token/TokenRevocationStatus'
export { type TokenRevocationStatusInput } from '#types/token/TokenRevocationStatusInput'
export { type TokenRevokeInput } from '#types/token/TokenRevokeInput'
export { type TokenRotateInput } from '#types/token/TokenRotateInput'
export { type TrackGame } from '#types/trackGame/TrackGame'
export { type Translatable } from '#types/translate/Translatable'
export { type TranslationVariables } from '#types/translate/TranslationVariables'
export { type AdminUser } from '#types/user/AdminUser'
export { type CreateUser } from '#types/user/CreateUser'
export { type PublicUser } from '#types/user/PublicUser'
export { type UserEmail } from '#types/user/UserEmail'
export { type UserName } from '#types/user/UserName'

// --- Utils ---
export { apiFetch } from '#utils/fetch/apiFetch'
export { getBaseUrl } from '#utils/http/getBaseUrl'
export { getTranslationPath } from '#utils/translate/getTranslationPath'
export { t } from '#utils/translate/t'
export { translate } from '#utils/translate/translate'
export { validateSchema } from '#utils/validate/validateSchema'
