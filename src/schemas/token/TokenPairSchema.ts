import { z } from 'zod'
import { NonEmptyStringSchema } from '../base/NonEmptyStringSchema.ts'

export const TokenPairSchema = z.object({
  accessToken: NonEmptyStringSchema,
  refreshToken: NonEmptyStringSchema,
})
