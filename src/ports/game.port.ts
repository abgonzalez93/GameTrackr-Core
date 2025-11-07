import type { Id } from '#types/base.type'
import type { Game, GameFilters, GameList } from '#types/game.type'

export interface GamePort {
  searchGames(filters: GameFilters): Promise<GameList>
  getGameById(id: Id): Promise<Game | null>
}
