import { z } from 'zod'
import { GameListSchema } from '#schemas/game/GameListSchema'

/**
 * **GameList**
 *
 * Type alias inferred from {@link GameListSchema}.
 *
 * Represents a **collection of normalized game entities** retrieved from
 * an external provider or internal database.
 *
 * Used by application services, use cases, and controller responses
 * to standardize list-based operations across the TrackPlay Catalog domain.
 *
 * ### Notes
 * - Acts as the **typed output** for game search and listing endpoints.
 * - Normalized via mappers like {@link toGame}.
 * - Commonly returned by implementations of {@link GamePort.searchGames}.
 *
 * @see {@link GameListSchema}
 * @see {@link Game}
 * @see {@link GameFilters}
 */
export type GameList = z.infer<typeof GameListSchema>
