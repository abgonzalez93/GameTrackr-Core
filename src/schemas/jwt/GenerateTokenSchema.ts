import { TokenSubSchema } from './TokenCommon'
import { z } from 'zod'

/**
 * Schema for requesting new access and refresh tokens.
 */
export const GenerateTokenSchema = z.object({
  sub: TokenSubSchema,
})

export type GenerateTokenDTO = z.infer<typeof GenerateTokenSchema>
