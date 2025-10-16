import { z } from 'zod'
import { LoginInputSchema } from '#schemas/login/LoginInputSchema'

/**
 * **LoginInput**
 *
 * Type alias inferred from {@link LoginInputSchema}.
 *
 * Represents the validated input payload for the **user authentication (login)** flow.
 * Accepts either a **username** or **email** as an identifier, along with a password.
 *
 * ### Responsibilities
 * - Validate that the provided identifier is a valid email or username.
 * - Enforce presence and minimum length requirements for the password.
 * - Provide a standardized DTO for authentication use cases.
 *
 * ### Notes
 * - Used by authentication endpoints (e.g., `/auth/login`).
 * - Serves as the entry point for issuing JWT token pairs upon successful authentication.
 *
 * @see {@link LoginInputSchema}
 */
export type LoginInput = z.infer<typeof LoginInputSchema>
