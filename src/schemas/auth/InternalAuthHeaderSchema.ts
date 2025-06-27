import { z } from 'zod'

/**
 * Zod schema to validate the `x-auth-token` header format.
 *
 * Expected: A base64-encoded secret string (64 bytes).
 * Example: generated with `openssl rand -base64 64`
 */
export const InternalAuthHeaderSchema = z.string().regex(/^[A-Za-z0-9+/=]{88}$/)

export type InternalAuthHeader = z.infer<typeof InternalAuthHeaderSchema>
