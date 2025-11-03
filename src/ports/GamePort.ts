import { type Id } from '#types/base/Id'
import { type Game } from '#types/game/Game'
import { type GameFilters } from '#types/game/GameFilters'
import { type GameList } from '#types/game/GameList'

export interface GamePort {
  searchGames(filters: GameFilters): Promise<GameList>
  getGameById(id: Id): Promise<Game | null>
}
