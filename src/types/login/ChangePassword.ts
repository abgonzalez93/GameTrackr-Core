import { z } from 'zod'
import { ChangePasswordSchema } from '#schemas/login/ChangePasswordSchema'

export type ChangePassword = z.infer<typeof ChangePasswordSchema>
