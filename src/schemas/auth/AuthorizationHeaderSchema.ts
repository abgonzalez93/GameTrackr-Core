import { z } from 'zod'

export const AuthorizationHeaderSchema = z.string().regex(/^Bearer\s+[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
