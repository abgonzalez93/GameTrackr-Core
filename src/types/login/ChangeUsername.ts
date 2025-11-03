import { z } from 'zod'
import { ChangeUsernameSchema } from '#schemas/login/ChangeUsernameSchema'

export type ChangeUsername = z.infer<typeof ChangeUsernameSchema>
