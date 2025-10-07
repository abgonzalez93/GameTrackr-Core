import { z } from 'zod'

/**
 * **InternalAuthHeaderSchema**
 *
 * Zod schema validating the format of the internal `x-auth-token` header
 * used for **inter-service authentication** within the TrackPlay ecosystem.
 *
 * ### Expected Format
 * A Base64-encoded secret string generated from 64 random bytes:
 * ```
 * x-auth-token: <base64-string>
 * ```
 *
 * ### Validation Rules
 * - Must contain exactly **88 Base64 characters**, matching the encoding of 64 raw bytes.
 * - Allowed characters: `A–Z`, `a–z`, `0–9`, `+`, `/`, and `=`.
 * - Designed for secrets generated via:
 *   ```bash
 *   openssl rand -base64 64
 *   ```
 *
 * @remarks
 * This schema is intended exclusively for **internal service communication**
 * (e.g., Auth → Catalog requests), not for public API consumers.
 *
 * @see {@link https://www.openssl.org/docs/manmaster/man1/openssl-rand.html | OpenSSL rand documentation}
 */
export const InternalAuthHeaderSchema = z.string().regex(/^[A-Za-z0-9+/=]{88}$/)
