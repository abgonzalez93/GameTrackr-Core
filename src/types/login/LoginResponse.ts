import { z } from 'zod'
import { LoginResponseSchema } from '#schemas/login/LoginResponseSchema'

/**
 * **LoginResponse**
 *
 * Type alias inferred from {@link LoginResponseSchema}.
 *
 * Represents the standardized output returned after a **successful login** operation.
 * Encapsulates the pair of newly issued JWT tokens (access and refresh).
 *
 * ### Responsibilities
 * - Define the structure of the authentication response payload.
 * - Provide strong typing for downstream consumers (controllers, clients, SDKs).
 * - Ensure consistent token response formatting across all authentication services.
 *
 * ### Notes
 * - Typically returned by `/auth/login` after credential validation.
 * - Used by frontend clients to securely store and refresh session tokens.
 *
 * @see {@link LoginResponseSchema}
 */
export type LoginResponse = z.infer<typeof LoginResponseSchema>
