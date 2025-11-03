import { z } from 'zod'
import { TokenRevocationStatusSchema } from '#schemas/token/TokenRevocationStatusSchema'

export type TokenRevocationStatus = z.infer<typeof TokenRevocationStatusSchema>
