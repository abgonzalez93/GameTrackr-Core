import { z } from 'zod'
import { JWTSubSchema } from '../jwt/JWTSubSchema.ts'

/**
 * **TokenGenerateInputSchema**
 *
 * Zod schema defining the **input payload** required to generate a new
 * JWT token pair (access + refresh).
 *
 * ### Purpose
 * Represents the minimal domain-level data needed for token generation.
 * The `sub` (subject) field uniquely identifies the user or entity
 * for whom the tokens are being created.
 *
 * ### Structure
 * - `sub`: A validated {@link JWTSubSchema} representing the user ID (stringified number).
 *
 * @see {@link JWTSubSchema}
 */
export const TokenGenerateInputSchema = z.object({
  sub: JWTSubSchema,
})
