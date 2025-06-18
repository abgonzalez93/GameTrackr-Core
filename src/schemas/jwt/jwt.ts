import { JWTSubSchema, JWTExpSchema, JWTJtiSchema, JWTTypSchema } from './jwt.shared'
import { OptionalStringArraySchema } from '@schemas/index'
import { z } from 'zod'

/**
 * Common base for both access and refresh tokens.
 */
const BaseTokenPayloadSchema = z.object({
  sub: JWTSubSchema,
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
  typ: JWTTypSchema,
})

/**
 * Schema for access token payload.
 */
export const AccessTokenPayloadSchema = BaseTokenPayloadSchema.extend({
  typ: z.literal('access'),
  roles: OptionalStringArraySchema,
  scopes: OptionalStringArraySchema,
})

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>

/**
 * Schema for refresh token payload.
 */
export const RefreshTokenPayloadSchema = BaseTokenPayloadSchema.extend({
  typ: z.literal('refresh'),
})

export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>

/**
 * Union schema to validate either token type.
 */
export const JWTPayloadUnionSchema = z.union([AccessTokenPayloadSchema, RefreshTokenPayloadSchema])

export type JWTPayload = AccessTokenPayload | RefreshTokenPayload
