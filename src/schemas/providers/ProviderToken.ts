import z from 'zod'

/**
 * This schema abstracts away provider-specific token formats (e.g. IGDB OAuth,
 * RAWG API keys) into a unified structure that the application can consume.
 *
 * Rules:
 * - If `type` is "bearer", `expiresAt` must be a non-null integer timestamp.
 * - If `type` is "apiKey", `expiresAt` must be null.
 */
export const ProviderTokenSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('bearer'),
    token: z.string(),
    expiresAt: z.number().int().nonnegative(),
  }),
  z.object({
    type: z.literal('apiKey'),
    token: z.string(),
    expiresAt: z.null(),
  }),
])

export type ProviderToken = z.infer<typeof ProviderTokenSchema>
