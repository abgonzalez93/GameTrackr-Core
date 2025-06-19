import { z } from 'zod'

/**
 * Zod schema to validate the Authorization header format.
 *
 * Expected format: "Bearer <base64 string>"
 */
export const AuthorizationHeaderSchema = z.string().regex(/^Bearer\s+[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, {
  message: 'Invalid Authorization header format',
})

export type AuthorizationHeader = z.infer<typeof AuthorizationHeaderSchema>
