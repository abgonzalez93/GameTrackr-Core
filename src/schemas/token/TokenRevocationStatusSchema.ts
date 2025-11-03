import { z } from 'zod'

export const TokenRevocationStatusSchema = z.object({
  revoked: z.boolean(),
})
