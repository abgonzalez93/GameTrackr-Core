import { z } from 'zod'

/**
 * **ProviderTokenSchema**
 *
 * Zod schema that defines a **unified representation of external provider tokens**.
 *
 * This abstraction normalizes differences between various authentication mechanisms
 * (e.g., OAuth-based IGDB tokens vs. static RAWG API keys), allowing the application
 * to consume them through a consistent structure.
 *
 * ### Behavior
 * - If `type` is `"bearer"` → the token is time-limited and must include a numeric `expiresAt` timestamp.
 * - If `type` is `"apiKey"` → the token never expires and must have `expiresAt = null`.
 *
 * @see {@link z.discriminatedUnion}
 */
export const ProviderTokenSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('bearer'),
    token: z.string(),
    expiresAt: z.number().int().nonnegative(),
  }),
  z.object({
    type: z.literal('apiKey'),
    token: z.string(),
    expiresAt: z.null(),
  }),
])
