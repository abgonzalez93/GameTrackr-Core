import { z } from 'zod'

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
