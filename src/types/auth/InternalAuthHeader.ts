import { InternalAuthHeaderSchema } from '#schemas/auth/InternalAuthHeaderSchema'
import { z } from 'zod'

/**
 * **InternalAuthHeader**
 *
 * Type alias inferred from {@link InternalAuthHeaderSchema}.
 *
 * Represents the expected format of the internal authentication header
 * (`x-auth-token`) used for secure service-to-service communication
 * within the TrackPlay ecosystem.
 *
 * ### Notes
 * - Expected to be a **base64-encoded 64-byte secret string**.
 * - Typically generated once and stored as an environment variable.
 * - Used exclusively for **internal service authentication** (not user-level JWTs).
 *
 * @see {@link InternalAuthHeaderSchema}
 */
export type InternalAuthHeader = z.infer<typeof InternalAuthHeaderSchema>
