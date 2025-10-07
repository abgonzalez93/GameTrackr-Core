import { ProviderTokenSchema } from '#schemas/providers/ProviderTokenSchema'
import { z } from 'zod'

/**
 * **ProviderToken**
 *
 * Type alias inferred from {@link ProviderTokenSchema}.
 *
 * Represents an **authentication credential** obtained from an external game data provider
 * (e.g., IGDB, RAWG, Steam). The structure abstracts away provider-specific formats
 * — such as OAuth Bearer tokens or static API keys — into a unified domain model.
 *
 * ### Responsibilities
 * - Standardize provider authentication payloads across integrations.
 * - Support both short-lived (`bearer`) and persistent (`apiKey`) tokens.
 * - Serve as the return type for {@link ProviderTokenPort.requestToken}.
 *
 * ### Notes
 * - `type: "bearer"` tokens include an expiration timestamp (`expiresAt`).
 * - `type: "apiKey"` tokens have `expiresAt: null` (permanent or manually rotated).
 *
 * @see {@link ProviderTokenSchema}
 */
export type ProviderToken = z.infer<typeof ProviderTokenSchema>
