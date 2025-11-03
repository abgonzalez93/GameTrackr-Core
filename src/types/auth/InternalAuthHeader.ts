import { z } from 'zod'
import { InternalAuthHeaderSchema } from '#schemas/auth/InternalAuthHeaderSchema'

export type InternalAuthHeader = z.infer<typeof InternalAuthHeaderSchema>
