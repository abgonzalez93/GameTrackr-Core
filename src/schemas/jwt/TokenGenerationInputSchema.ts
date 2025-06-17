import { JWTSubjectSchema } from './JWTCommon'
import { z } from 'zod'

/**
 * Zod schema for requesting new access and refresh tokens.
 */
export const TokenGenerationInputSchema = z.object({
  sub: JWTSubjectSchema,
})
export type TokenGenerationInput = z.infer<typeof TokenGenerationInputSchema>
