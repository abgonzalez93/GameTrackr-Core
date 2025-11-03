import { z } from 'zod'
import { TokenRotateInputSchema } from '#schemas/token/TokenRotateInputSchema'

export type TokenRotateInput = z.infer<typeof TokenRotateInputSchema>
