import { GameFilters } from '#types/game/GameFilters'
import { GameList } from '#types/game/GameList'
import { Game } from '#types/game/Game'
import { Id } from '#types/base/Id'

/**
 * **GamePort**
 *
 * Defines the **infrastructure-level contract** for retrieving and searching
 * games from external game data providers (e.g., IGDB, RAWG).
 *
 * ### Responsibilities
 * - Fetch raw game data from the provider.
 * - Normalize provider-specific responses into domain-safe {@link Game} entities.
 * - Respect the filtering and sorting criteria defined in {@link GameFilters}.
 *
 * ### Layer
 * - **Port (Infrastructure Contract)** — implemented by provider adapters.
 * - Consumed by the {@link GameService} in the application layer.
 */
export interface GamePort {
  /**
   * Searches for games based on the given domain-neutral filters.
   *
   * @param filters - Filtering and sorting criteria expressed in provider-agnostic format.
   * @returns A promise resolving to a {@link GameList} of normalized game entities.
   */
  searchGames(filters: GameFilters): Promise<GameList>

  /**
   * Retrieves a single game by its domain-level identifier.
   *
   * @param id - The unique identifier of the game within the domain.
   * @returns A promise resolving to the normalized {@link Game} entity,
   * or `null` if the game does not exist.
   */
  getGameById(id: Id): Promise<Game | null>
}
