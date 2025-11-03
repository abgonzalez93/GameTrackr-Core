import { z } from 'zod'
import { TokenGenerateInputSchema } from '#schemas/token/TokenGenerateInputSchema'

export type TokenGenerateInput = z.infer<typeof TokenGenerateInputSchema>
