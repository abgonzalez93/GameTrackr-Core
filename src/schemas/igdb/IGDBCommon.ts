import { PositiveNumberSchema } from '@schemas/shared'
import z from 'zod'

/**
 * Zod schema for validating an IGDB ID.
 *
 * Coerces the input to a positive integer.
 * IGDB IDs are numeric and must be greater than zero.
 */
export const IGDBIdSchema = PositiveNumberSchema

export type IGDBId = z.infer<typeof IGDBIdSchema>

/**
 * Schema for the OAuth token response from IGDB/Twitch.
 */
export const IGDBTokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
})

export type IGDBToken = z.infer<typeof IGDBTokenSchema>
