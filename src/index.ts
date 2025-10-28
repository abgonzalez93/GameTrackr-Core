import { connectRedis } from '#clients/redis/connectRedis'
import { createRedis } from '#clients/redis/createRedis'
import { getClientEnv } from '#config/getClientEnv'
import { getSecrets } from '#config/getSecrets'
import { getServerEnv } from '#config/getServerEnv'
import { GAME } from '#constants/game'
import { HTTP_STATUS } from '#constants/httpStatus'
import { JWT } from '#constants/jwt'
import { LOGGER } from '#constants/logger'
import { NODE_ENV } from '#constants/nodeEnv'
import { TrackPlayError } from '#errors/base/TrackPlayError'
import { BadRequestError } from '#errors/http/BadRequestError'
import { ConflictError } from '#errors/http/ConflictError'
import { ForbiddenError } from '#errors/http/ForbiddenError'
import { NotFoundError } from '#errors/http/NotFoundError'
import { TooManyRequestsError } from '#errors/http/TooManyRequestsError'
import { UnauthorizedError } from '#errors/http/UnauthorizedError'
import { UnprocessableEntityError } from '#errors/http/UnprocessableEntityError'
import { createI18n } from '#i18n/createI18n'
import { initI18n } from '#i18n/initI18n'
import { createLogger } from '#logger/createLogger'
import { AuthorizationHeaderSchema } from '#schemas/auth/AuthorizationHeaderSchema'
import { InternalAuthHeaderSchema } from '#schemas/auth/InternalAuthHeaderSchema'
import { IdListSchema } from '#schemas/base/IdListSchema'
import { IdSchema } from '#schemas/base/IdSchema'
import { IpAddressSchema } from '#schemas/base/IpAddressSchema'
import { NodeEnvSchema } from '#schemas/base/NodeEnvSchema'
import { NonEmptyStringSchema } from '#schemas/base/NonEmptyStringSchema'
import { OptionalStringArraySchema } from '#schemas/base/OptionalStringArraySchema'
import { PortSchema } from '#schemas/base/PortSchema'
import { PositiveNumberSchema } from '#schemas/base/PositiveNumberSchema'
import { UrlSchema } from '#schemas/base/UrlSchema'
import { CategoryListSchema } from '#schemas/category/CategoryListSchema'
import { CategorySchema } from '#schemas/category/CategorySchema'
import { BaseServerEnvSchema } from '#schemas/config/BaseServerEnvSchema'
import { CreateGameSchema } from '#schemas/game/CreateGameSchema'
import { GameFiltersSchema } from '#schemas/game/GameFiltersSchema'
import { GameListSchema } from '#schemas/game/GameListSchema'
import { GameSchema } from '#schemas/game/GameSchema'
import { JWTExpSchema } from '#schemas/jwt/JWTExpSchema'
import { JWTJtiSchema } from '#schemas/jwt/JWTJtiSchema'
import { JWTSubSchema } from '#schemas/jwt/JWTSubSchema'
import { ChangePasswordSchema } from '#schemas/login/ChangePasswordSchema'
import { ChangeUsernameSchema } from '#schemas/login/ChangeUsernameSchema'
import { ForgotPasswordSchema } from '#schemas/login/ForgotPasswordSchema'
import { LoginInputSchema } from '#schemas/login/LoginInputSchema'
import { LoginResponseSchema } from '#schemas/login/LoginResponseSchema'
import { ProviderTokenSchema } from '#schemas/providers/ProviderTokenSchema'
import { TokenGenerateInputSchema } from '#schemas/token/TokenGenerateInputSchema'
import { TokenPairSchema } from '#schemas/token/TokenPairSchema'
import { TokenRevocationStatusInputSchema } from '#schemas/token/TokenRevocationStatusInputSchema'
import { TokenRevocationStatusSchema } from '#schemas/token/TokenRevocationStatusSchema'
import { TokenRevokeInputSchema } from '#schemas/token/TokenRevokeInputSchema'
import { TokenRotateInputSchema } from '#schemas/token/TokenRotateInputSchema'
import { TrackGameSchema } from '#schemas/trackGame/TrackGameSchema'
import { AdminUserSchema } from '#schemas/user/AdminUserSchema'
import { CreateUserSchema } from '#schemas/user/CreateUserSchema'
import { PublicUserSchema } from '#schemas/user/PublicUserSchema'
import { UserEmailSchema } from '#schemas/user/UserEmailSchema'
import { UserNameSchema } from '#schemas/user/UserNameSchema'
import { apiFetch } from '#utils/fetch/apiFetch'
import { getBaseUrl } from '#utils/http/getBaseUrl'
import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { t } from '#utils/translate/t'
import { translate } from '#utils/translate/translate'
import { validateSchema } from '#utils/validate/validateSchema'

/**
 * TrackPlay Core — Public API Entry Point
 *
 * Exposes the unified, public API surface of the **TrackPlay Core** package.
 * Serves as the foundation of the TrackPlay ecosystem by providing shared
 * constants, configuration utilities, error classes, translation helpers,
 * logger factories, and infrastructure clients.
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

  // --- Constants ---
  GAME,
  HTTP_STATUS,
  JWT,
  LOGGER,
  NODE_ENV,

  // --- Errors ---
  TrackPlayError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,

  // --- i18n ---
  createI18n,
  initI18n,

  // --- Logger ---
  createLogger,

  // --- Schemas ---
  AuthorizationHeaderSchema,
  InternalAuthHeaderSchema,
  IdListSchema,
  IdSchema,
  IpAddressSchema,
  NodeEnvSchema,
  NonEmptyStringSchema,
  OptionalStringArraySchema,
  PortSchema,
  PositiveNumberSchema,
  UrlSchema,
  CategoryListSchema,
  CategorySchema,
  BaseServerEnvSchema,
  CreateGameSchema,
  GameFiltersSchema,
  GameListSchema,
  GameSchema,
  JWTExpSchema,
  JWTJtiSchema,
  JWTSubSchema,
  ChangePasswordSchema,
  ChangeUsernameSchema,
  ForgotPasswordSchema,
  LoginInputSchema,
  LoginResponseSchema,
  ProviderTokenSchema,
  TokenGenerateInputSchema,
  TokenPairSchema,
  TokenRevocationStatusInputSchema,
  TokenRevocationStatusSchema,
  TokenRevokeInputSchema,
  TokenRotateInputSchema,
  TrackGameSchema,
  AdminUserSchema,
  CreateUserSchema,
  PublicUserSchema,
  UserEmailSchema,
  UserNameSchema,

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

// --- Ports ---
export { type BlacklistPort } from '#ports/BlacklistPort'
export { type CategoryPort } from '#ports/CategoryPort'
export { type GamePort } from '#ports/GamePort'
export { type ProviderTokenPort } from '#ports/ProviderTokenPort'
export { type TokenPort } from '#ports/TokenPort'

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
export { type DependencyFactories } from '#types/container/DependencyFactories'
export { type DependencyLayers } from '#types/container/DependencyLayers'
export { type EnvSecretsBundle } from '#types/container/EnvSecretsBundle'
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
