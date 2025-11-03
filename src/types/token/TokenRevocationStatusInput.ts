import { z } from 'zod'
import { TokenRevocationStatusInputSchema } from '#schemas/token/TokenRevocationStatusInputSchema'

export type TokenRevocationStatusInput = z.infer<typeof TokenRevocationStatusInputSchema>
