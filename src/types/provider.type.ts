import { z } from 'zod'
import { ProviderTokenSchema } from '#schemas/provider.schema'

export type ProviderToken = z.infer<typeof ProviderTokenSchema>
