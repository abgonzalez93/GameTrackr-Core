import z from 'zod'

/**
 * This schema abstracts away provider-specific token formats (e.g. IGDB OAuth,
 * RAWG API keys) into a unified structure that the application can consume.
 */
export const ProviderTokenSchema = z.object({
  token: z.string(),
  expiresAt: z.number().int().nonnegative().nullable(),
  type: z.enum(['bearer', 'apiKey']),
})

export type ProviderToken = z.infer<typeof ProviderTokenSchema>
