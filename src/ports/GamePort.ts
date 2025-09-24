import { Game, GameList, GameFilters, Id } from '@schemas/index'

/**
 * Port defining the contract for retrieving and searching games
 * from any external game provider.
 *
 * Implementations must transform provider-specific data into
 * domain-neutral {@link Game} entities and respect the filtering
 * options defined in {@link GameFilters}.
 */
export interface GamePort {
  /**
   * Searches for games based on domain-neutral filters.
   *
   * @param filters - Filtering and sorting criteria in provider-agnostic format.
   * @returns {Promise<GameList>} A list of games normalized into domain entities.
   */
  searchGames(filters: GameFilters): Promise<GameList>

  /**
   * Retrieves a single game by its domain-level identifier.
   *
   * @param id - Unique identifier of the game in the domain.
   * @returns {Promise<Game | null>} The normalized {@link Game} entity,
   * or `null` if the game is not found.
   */
  getGameById(id: Id): Promise<Game | null>
}
