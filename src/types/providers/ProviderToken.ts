import { z } from 'zod'
import { ProviderTokenSchema } from '#schemas/providers/ProviderTokenSchema'

export type ProviderToken = z.infer<typeof ProviderTokenSchema>
