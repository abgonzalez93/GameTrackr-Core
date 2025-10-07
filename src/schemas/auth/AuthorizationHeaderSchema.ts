import { z } from 'zod'

/**
 * **AuthorizationHeaderSchema**
 *
 * Zod schema validating the structure of an HTTP `Authorization` header.
 *
 * ### Expected Format
 * ```
 * Authorization: Bearer <JWT>
 * ```
 * Where `<JWT>` must conform to the standard JWT format:
 * ```
 * <header>.<payload>.<signature>
 * ```
 *
 * ### Validation Rules
 * - Must start with the literal `Bearer` (case-sensitive).
 * - Must contain exactly three Base64URL segments separated by dots.
 * - Rejects malformed or non-Bearer tokens.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6750 | RFC 6750: Bearer Token Usage}
 */
export const AuthorizationHeaderSchema = z.string().regex(/^Bearer\s+[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
