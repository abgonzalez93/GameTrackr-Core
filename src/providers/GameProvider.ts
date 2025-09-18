import { Game, GameFilters } from '@trackplay/core/schemas'

/**
 * Contract for any external game provider (IGDB, RAWG, Steam, etc.)
 */
export interface GameProvider {
  searchGames(filters: GameFilters): Promise<Game[]>
  getGameById(id: number): Promise<Game>
}
