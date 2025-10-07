import { UserNameSchema } from '#schemas/user/UserNameSchema'
import { z } from 'zod'

/**
 * **UserName**
 *
 * Type alias inferred from {@link UserNameSchema}.
 *
 * Represents a validated username used as a **unique login identifier**
 * and public handle within the TrackPlay ecosystem.
 *
 * ### Validation Rules
 * - Minimum 3 and maximum 30 characters.
 * - Allows only alphanumeric characters and underscores (`_`).
 * - Must not contain spaces or special characters.
 *
 * ### Responsibilities
 * - Ensure consistent, safe, and searchable user handles.
 * - Serve as a login credential alternative to email.
 * - Maintain a unified identity format across TrackPlay services.
 *
 * @see {@link UserNameSchema}
 * @see {@link CreateUser}
 * @see {@link PublicUser}
 */
export type UserName = z.infer<typeof UserNameSchema>
