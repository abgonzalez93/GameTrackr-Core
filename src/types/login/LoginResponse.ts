import { z } from 'zod'
import { LoginResponseSchema } from '#schemas/login/LoginResponseSchema'

export type LoginResponse = z.infer<typeof LoginResponseSchema>
