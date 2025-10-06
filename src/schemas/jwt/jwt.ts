import { JWTSubSchema, JWTExpSchema, JWTJtiSchema, JWTTypSchema } from './jwt.shared.js'
import { OptionalStringArraySchema } from '../shared/shared.js'
import { z } from 'zod'

/**
 * Common base for both access and refresh tokens.
 */
const BaseTokenPayload = z.object({
  sub: JWTSubSchema,
  exp: JWTExpSchema,
  jti: JWTJtiSchema,
  typ: JWTTypSchema,
})

/**
 * Schema for access token payload.
 */
export const AccessTokenPayloadSchema = BaseTokenPayload.extend({
  typ: z.literal('access'),
  roles: OptionalStringArraySchema,
  scopes: OptionalStringArraySchema,
})

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>

/**
 * Schema for refresh token payload.
 */
export const RefreshTokenPayloadSchema = BaseTokenPayload.extend({
  typ: z.literal('refresh'),
})

export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>

/**
 * Union schema to validate either token type.
 */
export const JWTPayloadUnionSchema = z.union([AccessTokenPayloadSchema, RefreshTokenPayloadSchema])

export type JWTPayloadUnion = z.infer<typeof JWTPayloadUnionSchema>
