import { z } from 'zod'

/**
 * Zod schema to validate the Authorization header format.
 *
 * Expected format: "Bearer <base64 string>"
 * Example token generated with: `openssl rand -base64 64`
 */
export const AuthTokenSchema = z.object({
  token: z.string().regex(/^Bearer\s+[A-Za-z0-9+/=]{88}$/, {
    message: 'Invalid Authorization header format',
  }),
})

export type AuthToken = z.infer<typeof AuthTokenSchema>
