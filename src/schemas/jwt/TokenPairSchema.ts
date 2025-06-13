import { NonEmptyStringSchema } from '@schemas/shared'
import { z } from 'zod'

/**
 * Zod schema for a pair of access and refresh tokens.
 */
export const TokenPairSchema = z.object({
  accessToken: NonEmptyStringSchema.describe('Signed access token'),
  refreshToken: NonEmptyStringSchema.describe('Signed refresh token'),
})

export type TokenPair = z.infer<typeof TokenPairSchema>
