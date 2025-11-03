import { z } from 'zod'
import { LoginInputSchema } from '#schemas/login/LoginInputSchema'

export type LoginInput = z.infer<typeof LoginInputSchema>
