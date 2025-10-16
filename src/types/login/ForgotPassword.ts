import { z } from 'zod'
import { ForgotPasswordSchema } from '#schemas/login/ForgotPasswordSchema'

/**
 * **ForgotPassword**
 *
 * Type alias inferred from {@link ForgotPasswordSchema}.
 *
 * Represents the validated input for the **"forgot password"** request flow.
 * Used when a user initiates a password reset by providing their email address.
 *
 * ### Responsibilities
 * - Validate the presence and format of the `email` field.
 * - Ensure the provided address passes domain and disposable checks.
 * - Standardize input before triggering password recovery logic.
 *
 * ### Notes
 * - Typically used by public authentication endpoints (e.g., `/auth/forgot-password`).
 * - Serves as the entry point for sending password reset emails or tokens.
 *
 * @see {@link ForgotPasswordSchema}
 */
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>
