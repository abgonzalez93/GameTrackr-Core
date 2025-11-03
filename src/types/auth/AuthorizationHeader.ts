import { z } from 'zod'
import { AuthorizationHeaderSchema } from '#schemas/auth/AuthorizationHeaderSchema'

export type AuthorizationHeader = z.infer<typeof AuthorizationHeaderSchema>
