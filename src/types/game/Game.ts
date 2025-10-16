import { z } from 'zod'
import { GameSchema } from '#schemas/game/GameSchema'

/**
 * **Game**
 *
 * Type alias inferred from {@link GameSchema}.
 *
 * Represents a **domain-level game entity**, normalized and independent
 * of external providers such as IGDB, RAWG, or Steam.
 *
 * This type defines the canonical structure used throughout the
 * **TrackPlay Catalog** service, ensuring consistent fields and naming
 * across all integrations.
 *
 * ### Notes
 * - Acts as the **single source of truth** for normalized game data.
 * - Provider-specific fields are mapped into this format by adapters.
 * - Used by repositories, controllers, and services throughout the Catalog domain.
 *
 * @see {@link GameSchema}
 * @see {@link GameList}
 * @see {@link CreateGame}
 */
export type Game = z.infer<typeof GameSchema>
