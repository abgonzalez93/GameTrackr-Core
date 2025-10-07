import { TokenGenerateInputSchema } from '#schemas/token/TokenGenerateInputSchema'
import { z } from 'zod'

/**
 * **TokenGenerateInput**
 *
 * Type alias inferred from {@link TokenGenerateInputSchema}.
 *
 * Represents the **input payload** required to generate a new pair of signed JWT tokens
 * (access and refresh). This input is passed into the {@link TokenService} or
 * {@link TokenUseCase} during the token generation flow.
 *
 * ### Responsibilities
 * - Define the required claims for issuing new JWT tokens.
 * - Serve as a validated input structure for token generation endpoints.
 * - Maintain provider-agnostic and cryptography-independent structure.
 *
 * ### Notes
 * - The `sub` (subject) claim uniquely identifies the authenticated user.
 * - This schema does **not** include sensitive or session-specific information.
 *
 * @see {@link TokenGenerateInputSchema}
 */
export type TokenGenerateInput = z.infer<typeof TokenGenerateInputSchema>
