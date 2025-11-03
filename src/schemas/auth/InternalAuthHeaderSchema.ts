import { z } from 'zod'

export const InternalAuthHeaderSchema = z.string().regex(/^[A-Za-z0-9+/=]{88}$/)
