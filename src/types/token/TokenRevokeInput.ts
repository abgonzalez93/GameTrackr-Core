import { z } from 'zod'
import { TokenRevokeInputSchema } from '#schemas/token/TokenRevokeInputSchema'

export type TokenRevokeInput = z.infer<typeof TokenRevokeInputSchema>
