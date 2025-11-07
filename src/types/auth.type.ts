import { z } from 'zod'
import { AuthorizationHeaderSchema, InternalAuthHeaderSchema } from '#schemas/auth.schema'

export type AuthorizationHeader = z.infer<typeof AuthorizationHeaderSchema>
export type InternalAuthHeader = z.infer<typeof InternalAuthHeaderSchema>
