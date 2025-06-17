import { NonEmptyStringSchema } from '@schemas/shared'
import { z } from 'zod'

/**
 * Zod schema for a pair of access and refresh tokens.
 */
export const SignedTokenPairSchema = z.object({
  accessToken: NonEmptyStringSchema,
  refreshToken: NonEmptyStringSchema,
})
export type SignedTokenPair = z.infer<typeof SignedTokenPairSchema>
